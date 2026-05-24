#!/usr/bin/env bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

#=================================================
#   System Required: CentOS/Debian/Ubuntu/Alpine
#   Description: sing-box anyTLS 管理脚本
#   bash <(curl -Ls https://github.com/Repcz/Tool/raw/X/sing-box/Script/anyTLS.sh)
#=================================================

sh_ver="1.1.2"
singbox_bin="/usr/local/bin/sing-box"
singbox_conf="/usr/local/etc/sing-box/config.json"
singbox_service=""  # 由 detectInit() 动态设置
singbox_work="/var/lib/sing-box"

Green_font_prefix="\033[32m" && Red_font_prefix="\033[31m" && Green_background_prefix="\033[42;37m" && Red_background_prefix="\033[41;37m" && Font_color_suffix="\033[0m" && Yellow_font_prefix="\033[0;33m" && Blue_font_prefix="\033[0;34m"
Info="${Green_font_prefix}[信息]${Font_color_suffix}"
Error="${Red_font_prefix}[错误]${Font_color_suffix}"
Tip="${Yellow_font_prefix}[注意]${Font_color_suffix}"

# 检查 Root
checkRoot(){
    [[ $EUID != 0 ]] && echo -e "${Error} 当前非ROOT账号，请使用 ${Green_background_prefix}sudo su${Font_color_suffix} 获取ROOT权限。" && exit 1
}

# 检查系统
checkSys(){
    if [[ -f /etc/alpine-release ]]; then
        release="alpine"
    elif [[ -f /etc/redhat-release ]]; then
        release="centos"
    elif cat /etc/issue 2>/dev/null | grep -q -E -i "debian"; then
        release="debian"
    elif cat /etc/issue 2>/dev/null | grep -q -E -i "ubuntu"; then
        release="ubuntu"
    elif cat /proc/version 2>/dev/null | grep -q -E -i "debian"; then
        release="debian"
    elif cat /proc/version 2>/dev/null | grep -q -E -i "ubuntu"; then
        release="ubuntu"
    elif cat /proc/version 2>/dev/null | grep -q -E -i "centos|red hat|redhat"; then
        release="centos"
    fi
    # 未识别则默认 alpine（alpine 精简版可能无 /etc/alpine-release）
    [[ -z "$release" ]] && release="alpine"
}

# 检测初始化系统，设置服务操作函数
detectInit(){
    if command -v systemctl &>/dev/null; then
        init_type="systemd"
        singbox_service="/etc/systemd/system/sing-box.service"
        svc_start()  { systemctl start sing-box; }
        svc_stop()   { systemctl stop sing-box 2>/dev/null; }
        svc_restart(){ systemctl restart sing-box; }
        svc_enable() { systemctl enable sing-box &>/dev/null; }
        svc_disable(){ systemctl disable sing-box 2>/dev/null; }
        svc_is_active(){ systemctl is-active --quiet sing-box 2>/dev/null; }
        svc_status(){ systemctl status sing-box --no-pager -l 2>/dev/null; }
        svc_reload() { systemctl daemon-reload; }
        svc_log()   { journalctl -u sing-box -f; }
    else
        init_type="openrc"
        singbox_service="/etc/init.d/sing-box"
        svc_start()  { rc-service sing-box start; }
        svc_stop()   { rc-service sing-box stop 2>/dev/null; }
        svc_restart(){ rc-service sing-box restart; }
        svc_enable() { rc-update add sing-box default &>/dev/null; }
        svc_disable(){ rc-update del sing-box default 2>/dev/null; }
        svc_is_active(){ rc-service sing-box status &>/dev/null; }
        svc_status(){ rc-service sing-box status 2>/dev/null; }
        svc_reload() { :; }  # OpenRC 无需 daemon-reload
        svc_log()   { tail -f /var/log/sing-box.log 2>/dev/null || echo -e "${Tip} 日志文件不存在"; }
    fi
}

# 检查系统架构
sysArch(){
    local uname
    uname=$(uname -m)
    if [[ "$uname" == "x86_64" ]]; then
        arch="amd64"
    elif [[ "$uname" == "aarch64" ]]; then
        arch="arm64"
    elif [[ "$uname" == *"armv7"* ]]; then
        arch="armv7"
    else
        echo -e "${Error} 不支持的架构: ${uname}" && exit 1
    fi
}

# 获取公网 IPv4
getPublicIP(){
    local ip
    for api in "https://api.ipify.org" "https://ifconfig.me" "https://icanhazip.com"; do
        ip=$(curl -s -4 --connect-timeout 5 --max-time 10 "$api" 2>/dev/null) || true
        if [[ -n "$ip" ]] && [[ "$ip" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            echo "$ip"
            return 0
        fi
    done
    # 回退
    ip route get 1.1.1.1 2>/dev/null | awk '{print $7; exit}' 2>/dev/null || hostname -I 2>/dev/null | awk '{print $1}'
}

# 安装依赖
installDependencies(){
    case ${release} in
        centos) yum install -y curl tar gzip jq &>/dev/null ;;
        alpine) apk add --no-cache curl tar gzip jq &>/dev/null ;;
        *)      apt-get update -qq && apt-get install -y curl tar gzip jq &>/dev/null ;;
    esac
}

# 检查依赖
checkDependencies(){
    local deps=("curl" "tar" "jq")
    for cmd in "${deps[@]}"; do
        if ! command -v "$cmd" &>/dev/null; then
            echo -e "${Info} 正在安装依赖..."
            installDependencies
            break
        fi
    done
}

# 获取最新版本
getLatestVersion(){
    local release_type="$1"
    local api_url response

    if [[ "$release_type" == "beta" ]]; then
        api_url="https://api.github.com/repos/SagerNet/sing-box/releases?per_page=1"
    else
        api_url="https://api.github.com/repos/SagerNet/sing-box/releases/latest"
    fi

    response=$(curl -s --connect-timeout 10 --max-time 30 "$api_url" 2>/dev/null) || true
    if [[ -z "$response" ]]; then
        echo ""
        return
    fi
    (echo "$response" | sed -n 's/.*"tag_name": *"\([^"]*\)".*/\1/p' | head -1) || true
}

# 版本比较: $1 >= $2 ?
versionGE(){
    local v1="${1#v}" v2="${2#v}"
    local IFS=.
    local a1=($v1) a2=($v2)
    local max=${#a1[@]}
    [[ ${#a2[@]} -gt $max ]] && max=${#a2[@]}
    for ((i=0; i<max; i++)); do
        local p1="${a1[$i]:-0}" p2="${a2[$i]:-0}"
        if (( p1 > p2 )); then return 0; fi
        if (( p1 < p2 )); then return 1; fi
    done
    return 0
}

# 生成随机密码
randomPwd(){
    tr -dc 'A-Za-z0-9' </dev/urandom | head -c 16
}

# 生成随机邮箱
randomEmail(){
    local name
    name=$(tr -dc 'a-z0-9' </dev/urandom | head -c 10)
    echo "${name}@gmail.com"
}

# 生成随机端口(排除22/80/520)
randomPort(){
    local port
    while true; do
        port=$(( RANDOM % 64512 + 1024 ))
        case "$port" in 22|80|520) continue ;; esac
        if ! ss -tuln 2>/dev/null | grep -q ":${port}\b"; then
            echo "$port" && return
        fi
    done
}

# 检查并获取可用端口
checkPort(){
    local port="$1"
    if [[ ! "$port" =~ ^[0-9]+$ ]] || [[ "$port" -lt 1 ]] || [[ "$port" -gt 65535 ]]; then
        return 1
    fi
    case "$port" in 22|80|520) return 2 ;; esac
    if ss -tuln 2>/dev/null | grep -q ":${port}\b"; then
        return 3
    fi
    return 0
}

# 检查安装状态
checkInstalledStatus(){
    [[ ! -e ${singbox_bin} ]] && echo -e "${Error} sing-box 未安装！" && return 1
    return 0
}

# 检查运行状态
checkStatus(){
    if svc_is_active; then
        status="running"
    else
        status="stopped"
    fi
}

# ==================== 安装 ====================
installSingbox(){
    # 检查是否已安装
    if [[ -e ${singbox_bin} ]]; then
        echo -e "${Tip} sing-box 已经安装，重新安装将覆盖现有配置"
        read -e -p "是否继续重新安装? [y/N]:" confirm
        [[ "$confirm" != "y" ]] && [[ "$confirm" != "Y" ]] && echo -e "${Info} 已取消" && return 0
        # 立即停止旧服务，释放端口
        echo -e "${Info} 正在停止旧服务..."
        svc_stop 2>/dev/null || true
        sleep 1
    fi

    echo -e "${Info} 开始安装 sing-box anyTLS"

    # --- 版本选择 ---
    echo ""
    echo -e "请选择版本类型:"
    echo -e " ${Green_font_prefix}1.${Font_color_suffix} 测试版 (pre-release)"
    echo -e " ${Green_font_prefix}2.${Font_color_suffix} 稳定版 (stable)"
    echo ""
    read -e -p "请输入数字 [1-2] (默认:1):" ver_choice
    [[ -z "$ver_choice" ]] && ver_choice="1"

    local release_type="pre-release"
    if [[ "$ver_choice" == "2" ]]; then
        release_type="stable"
    fi

    sysArch
    echo -e "${Info} 系统架构: ${arch}"

    local version
    version=$(getLatestVersion "$release_type")
    if [[ -z "$version" ]]; then
        echo -e "${Error} 无法获取版本号，请检查网络"
        return 1
    fi
    echo -e "${Info} 最新版本: ${version}"

    if [[ "$release_type" == "stable" ]]; then
        if ! versionGE "$version" "v1.14.0"; then
            echo -e "${Error} 稳定版 ${version} 低于 v1.14.0，anyTLS 需要 >=1.14.0，请选择测试版"
            return 1
        fi
    fi

    # --- 端口 ---
    echo ""
    echo -e "请设置入站端口:"
    echo -e " ${Green_font_prefix}1.${Font_color_suffix} 默认: 443"
    echo -e " ${Green_font_prefix}2.${Font_color_suffix} 随机端口"
    echo -e " ${Green_font_prefix}3.${Font_color_suffix} 自定义"
    echo ""
    read -e -p "请输入数字 [1-3] (默认:1):" port_choice
    [[ -z "$port_choice" ]] && port_choice="1"

    local listen_port
    local first_pass=true
    while true; do
        if $first_pass; then
            case "$port_choice" in
                1) listen_port=443 ;;
                2) listen_port=$(randomPort) ;;
                3) read -e -p "请输入端口号:" listen_port ;;
                *) listen_port=443 ;;
            esac
            first_pass=false
        else
            read -e -p "请重新输入端口号:" listen_port
        fi
        checkPort "$listen_port"
        case $? in
            0) echo -e "${Info} 端口: ${listen_port}" && break ;;
            1) echo -e "${Error} 无效端口" ;;
            2) echo -e "${Error} 端口 ${listen_port} 是保留端口(22/80/520)" ;;
            3) echo -e "${Tip} 端口 ${listen_port} 已被占用" ;;
        esac
    done

    # --- 密码 ---
    echo ""
    echo -e "请设置密码:"
    echo -e " ${Green_font_prefix}1.${Font_color_suffix} 随机生成"
    echo -e " ${Green_font_prefix}2.${Font_color_suffix} 自定义"
    echo ""
    read -e -p "请输入数字 [1-2] (默认:1):" pwd_choice
    [[ -z "$pwd_choice" ]] && pwd_choice="1"

    local password
    if [[ "$pwd_choice" == "2" ]]; then
        while true; do
            read -e -p "请输入密码(至少4位):" password
            if [[ ${#password} -ge 4 ]]; then break; fi
            echo -e "${Error} 密码至少4位"
        done
    else
        password=$(randomPwd)
    fi
    echo -e "${Info} 密码: ${password}"

    # --- 证书域名 ---
    echo ""
    echo -e "请设置 TLS 证书域名/IP:"
    echo -e " ${Green_font_prefix}1.${Font_color_suffix} 自动检测本机IP"
    echo -e " ${Green_font_prefix}2.${Font_color_suffix} 自定义"
    echo ""
    read -e -p "请输入数字 [1-2] (默认:1):" domain_choice
    [[ -z "$domain_choice" ]] && domain_choice="1"

    local cert_domain
    if [[ "$domain_choice" == "2" ]]; then
        read -e -p "请输入域名/IP:" cert_domain
    else
        cert_domain=$(getPublicIP)
        if [[ -z "$cert_domain" ]]; then
            echo -e "${Error} 无法获取本机IP，请手动输入"
            read -e -p "请输入域名/IP:" cert_domain
        fi
    fi
    [[ -z "$cert_domain" ]] && echo -e "${Error} 域名不能为空" && return 1
    echo -e "${Info} 证书域名: ${cert_domain}"

    # --- ACME 邮箱 ---
    echo ""
    echo -e "请设置 ACME 邮箱(Let's Encrypt 需要):"
    echo -e " ${Green_font_prefix}1.${Font_color_suffix} 随机生成"
    echo -e " ${Green_font_prefix}2.${Font_color_suffix} 自定义"
    echo ""
    read -e -p "请输入数字 [1-2] (默认:1):" email_choice
    [[ -z "$email_choice" ]] && email_choice="1"

    local acme_email
    if [[ "$email_choice" == "2" ]]; then
        while true; do
            read -e -p "请输入邮箱:" acme_email
            if [[ "$acme_email" =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
                break
            fi
            echo -e "${Error} 邮箱格式无效"
        done
    else
        acme_email=$(randomEmail)
    fi
    echo -e "${Info} 邮箱: ${acme_email}"

    # --- 节点名称 ---
    local server_name
    server_name=$(hostname 2>/dev/null | head -1)
    [[ -z "$server_name" ]] && server_name="sing-box"
    echo -e "${Info} 节点名称: ${server_name}"

    # --- 确认 ---
    echo ""
    echo -e "=============================="
    echo -e " 版本: ${version} (${release_type})"
    echo -e " 端口: ${listen_port}"
    echo -e " 密码: ${password}"
    echo -e " 域名: ${cert_domain}"
    echo -e " 邮箱: ${acme_email}"
    echo -e " 节点: ${server_name}"
    echo -e "=============================="
    echo ""
    read -e -p "确认安装? [Y/n]:" confirm
    [[ "$confirm" == "n" ]] || [[ "$confirm" == "N" ]] && echo -e "${Info} 已取消" && return 0

    # === 开始安装 ===
    # 停止旧服务
    svc_stop 2>/dev/null || true

    # 下载
    local dl_url="https://github.com/SagerNet/sing-box/releases/download/${version}/sing-box-${version#v}-linux-${arch}.tar.gz"
    local tmpdir
    tmpdir=$(mktemp -d)
    echo -e "${Info} 下载: ${dl_url}"
    if ! curl -L --progress-bar --connect-timeout 30 --max-time 600 -o "${tmpdir}/sing-box.tar.gz" "$dl_url"; then
        echo -e "${Error} 下载失败"
        rm -rf "$tmpdir"
        return 1
    fi

    # 解压安装
    tar -xzf "${tmpdir}/sing-box.tar.gz" -C "$tmpdir"
    local bin_path
    bin_path=$(find "$tmpdir" -type f -name "sing-box" -executable 2>/dev/null | head -1)
    if [[ -z "$bin_path" ]]; then
        echo -e "${Error} 未找到二进制文件"
        rm -rf "$tmpdir"
        return 1
    fi
    cp "$bin_path" "$singbox_bin"
    chmod +x "$singbox_bin"
    rm -rf "$tmpdir"

    local installed_ver
    installed_ver=$("$singbox_bin" version 2>/dev/null | head -1)
    echo -e "${Info} 安装完成: ${installed_ver}"

    # 生成配置
    mkdir -p "$(dirname "$singbox_conf")" "$singbox_work"
    cat > "$singbox_conf" << EOF
{
    "log": {
        "disabled": false,
        "level": "info",
        "timestamp": true
    },
    "certificate_providers": [
        {
            "type": "acme",
            "tag": "ip_cert",
            "domain": ["${cert_domain}"],
            "email": "${acme_email}"
        }
    ],
    "dns": {
        "servers": [
            {
                "tag": "cloudflare",
                "type": "udp",
                "server": "1.1.1.1"
            }
        ],
        "rules": [
            {
                "query_type": ["A", "AAAA"],
                "action": "route",
                "server": "cloudflare"
            }
        ],
        "strategy": "prefer_ipv4",
        "final": "cloudflare"
    },
    "inbounds": [
        {
            "type": "anytls",
            "tag": "anytls-in",
            "listen": "::",
            "listen_port": ${listen_port},
            "users": [
                {
                    "name": "singbox",
                    "password": "${password}"
                }
            ],
            "padding_scheme": [],
            "tls": {
                "enabled": true,
                "server_name": "${cert_domain}",
                "certificate_provider": "ip_cert"
            }
        }
    ],
    "route": {
        "rules": [
            {
                "inbound": ["anytls-in"],
                "action": "sniff"
            }
        ],
        "default_domain_resolver": "cloudflare"
    },
    "outbounds": [
        {
            "type": "direct"
        }
    ],
    "ntp": {
        "enabled": true,
        "server": "time.apple.com",
        "server_port": 123,
        "interval": "30m"
    }
}
EOF

    # 创建服务文件
    if [[ "$init_type" == "systemd" ]]; then
        cat > "$singbox_service" << EOF
[Unit]
Description=sing-box anyTLS Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=${singbox_work}
CapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
ExecStart=${singbox_bin} run -c ${singbox_conf}
Restart=on-failure
RestartSec=10
LimitNOFILE=1048576

[Install]
WantedBy=multi-user.target
EOF
    else
        cat > "$singbox_service" << EOF
#!/sbin/openrc-run
name="sing-box"
description="sing-box anyTLS Service"
command="${singbox_bin}"
command_args="run -c ${singbox_conf}"
command_background=true
pidfile="/var/run/sing-box.pid"
depend() {
    need net
}
EOF
        chmod +x "$singbox_service"
    fi

    svc_reload
    svc_enable

    # 校验配置
    echo -e "${Info} 校验配置文件..."
    "$singbox_bin" check -c "$singbox_conf" 2>&1 | tail -5

    # 启动
    svc_start
    sleep 2

    if svc_is_active; then
        echo -e "${Info} sing-box 已启动"

        # 输出 Surge 节点
        echo ""
        echo -e "=============================="
        echo -e " ${Info} Surge 节点:"
        echo -e " ${Green_font_prefix}${server_name} = anytls, ${cert_domain}, ${listen_port}, password=${password}, sni=${cert_domain}${Font_color_suffix}"
        echo -e "=============================="

        # 写入节点文件
        echo "${server_name} = anytls, ${cert_domain}, ${listen_port}, password=${password}, sni=${cert_domain}" > "$(dirname "$singbox_conf")/surge-node.txt"
        echo -e "${Info} 节点已保存到: $(dirname "$singbox_conf")/surge-node.txt"
    else
        echo -e "${Error} sing-box 启动失败，请查看日志"
    fi

    echo ""
    if [[ "$init_type" == "systemd" ]]; then
        echo -e "${Tip} 管理: systemctl start|stop|restart sing-box | journalctl -u sing-box -f"
    else
        echo -e "${Tip} 管理: rc-service sing-box start|stop|restart | tail -f /var/log/sing-box.log"
    fi
}

# ==================== 卸载 ====================
uninstallSingbox(){
    if ! checkInstalledStatus; then return 1; fi

    echo ""
    echo -e "确定要卸载 sing-box anyTLS ?"
    read -e -p "确认卸载? [y/N]:" confirm
    [[ "$confirm" != "y" ]] && [[ "$confirm" != "Y" ]] && echo -e "${Info} 已取消" && return 0

    svc_stop 2>/dev/null
    svc_disable 2>/dev/null
    rm -f "$singbox_bin"
    rm -rf "$(dirname "$singbox_conf")"
    rm -rf "$singbox_work"
    rm -f "$singbox_service"
    svc_reload
    echo -e "${Info} 卸载完成"
}

# ==================== 设置 ====================
setConfig(){
    if ! checkInstalledStatus; then return 1; fi

    echo ""
    echo -e "当前配置:"
    viewConfigRaw
    echo ""
    echo -e "请直接编辑配置文件:"
    echo -e " ${Green_font_prefix}nano ${singbox_conf}${Font_color_suffix}"
    echo ""
    read -e -p "编辑完成后按回车重启服务..." dummy
    svc_restart
    sleep 2
    checkStatus
    if [[ "$status" == "running" ]]; then
        echo -e "${Info} 服务已重启"
        viewSurgeNode
    else
        echo -e "${Error} 服务启动失败，请检查配置"
    fi
}

# 查看原始配置
viewConfigRaw(){
    if [[ -f "$singbox_conf" ]]; then
        local port domain password email
        port=$(sed -n 's/.*"listen_port": *\([0-9]*\).*/\1/p' "$singbox_conf" 2>/dev/null || echo "N/A")
        domain=$(sed -n 's/.*"server_name": *"\([^"]*\)".*/\1/p' "$singbox_conf" 2>/dev/null || echo "N/A")
        password=$(sed -n 's/.*"password": *"\([^"]*\)".*/\1/p' "$singbox_conf" 2>/dev/null || echo "N/A")
        email=$(sed -n 's/.*"email": *"\([^"]*\)".*/\1/p' "$singbox_conf" 2>/dev/null || echo "N/A")
        echo -e " 端口: ${port}"
        echo -e " 密码: ${password}"
        echo -e " 域名: ${domain}"
        echo -e " 邮箱: ${email}"
    fi
}

# 查看 Surge 节点
viewSurgeNode(){
    local surge_line
    # 优先从 surge-node.txt 读取；不存在则从 config.json 生成
    if [[ -f "$(dirname "$singbox_conf")/surge-node.txt" ]]; then
        surge_line=$(cat "$(dirname "$singbox_conf")/surge-node.txt")
    elif [[ -f "$singbox_conf" ]]; then
        local domain password port node_name
        domain=$(sed -n 's/.*"server_name": *"\([^"]*\)".*/\1/p' "$singbox_conf" 2>/dev/null || echo "???")
        port=$(sed -n 's/.*"listen_port": *\([0-9]*\).*/\1/p' "$singbox_conf" 2>/dev/null || echo "???")
        password=$(sed -n 's/.*"password": *"\([^"]*\)".*/\1/p' "$singbox_conf" 2>/dev/null || echo "???")
        node_name=$(hostname 2>/dev/null | head -1)
        [[ -z "$node_name" ]] && node_name="sing-box"
        surge_line="${node_name} = anytls, ${domain}, ${port}, password=${password}, sni=${domain}"
        # 回写文件以便下次使用
        echo "$surge_line" > "$(dirname "$singbox_conf")/surge-node.txt"
    fi

    if [[ -n "$surge_line" ]]; then
        echo ""
        echo -e "=============================="
        echo -e " ${Info} Surge 节点:"
        echo -e " ${Green_font_prefix}${surge_line}${Font_color_suffix}"
        echo -e "=============================="
    else
        echo -e "${Error} 未找到配置信息"
    fi
}

# ==================== 查看状态 ====================
viewStatus(){
    checkInstalledStatus || return 1
    echo ""
    svc_status
}

# ==================== 服务控制 ====================
startSingbox(){
    checkInstalledStatus || return 1
    svc_start
    sleep 1
    checkStatus
    if [[ "$status" == "running" ]]; then
        echo -e "${Info} sing-box 已启动"
    else
        echo -e "${Error} 启动失败"
    fi
}

stopSingbox(){
    checkInstalledStatus || return 1
    svc_stop
    echo -e "${Info} sing-box 已停止"
}

restartSingbox(){
    checkInstalledStatus || return 1
    svc_restart
    sleep 2
    checkStatus
    if [[ "$status" == "running" ]]; then
        echo -e "${Info} sing-box 已重启"
        viewSurgeNode
    else
        echo -e "${Error} 重启失败"
    fi
}

viewLog(){
    checkInstalledStatus || return 1
    svc_log
}

# ==================== 更新脚本 ====================
updateShell(){
    echo -e "当前版本为 [ ${sh_ver} ]，开始检测最新版本..."

    local shell_url="https://github.com/Repcz/Tool/raw/X/sing-box/Script/anyTLS.sh"
    sh_new_ver=$(curl -s --connect-timeout 10 --max-time 30 "$shell_url" 2>/dev/null | grep 'sh_ver="' | awk -F '"' '{print $2}' | head -1)
    if [[ -z ${sh_new_ver} ]]; then
        echo -e "${Error} 检测最新版本失败！"
        sleep 2s
        startMenu
    fi

    if [[ ${sh_new_ver} != ${sh_ver} ]]; then
        echo -e "发现新版本 [ ${sh_new_ver} ]，是否更新？[Y/n]"
        read -e -p "(默认: y):" yn
        [[ -z "${yn}" ]] && yn="y"
        if [[ ${yn} == [Yy] ]]; then
            curl -sSL --connect-timeout 10 --max-time 30 -o /tmp/singbox-anytls.sh "$shell_url" && chmod +x /tmp/singbox-anytls.sh
            echo -e "脚本已更新为最新版本 [ ${sh_new_ver} ]！"
            echo -e "3s 后执行新脚本"
            sleep 3s
            exec bash /tmp/singbox-anytls.sh
        else
            echo && echo "已取消..." && echo
            sleep 2s
            startMenu
        fi
    else
        echo -e "当前已是最新版本 [ ${sh_new_ver} ]！"
        sleep 2s
        startMenu
    fi
}

# ==================== 主菜单 ====================
startMenu(){
    clear
    checkRoot
    checkSys
    detectInit
    checkDependencies
    checkStatus 2>/dev/null || true

    echo
    echo -e " sing-box anyTLS 管理脚本 ${Green_font_prefix}[v${sh_ver}]${Font_color_suffix}"
    echo
    echo -e " ${Green_font_prefix}1.${Font_color_suffix} 安装 sing-box anyTLS"
    echo -e " ${Green_font_prefix}2.${Font_color_suffix} 卸载 sing-box anyTLS"
    echo -e " ${Red_font_prefix}3.${Font_color_suffix} 启动 sing-box"
    echo -e " ${Red_font_prefix}4.${Font_color_suffix} 停止 sing-box"
    echo -e " ${Red_font_prefix}5.${Font_color_suffix} 重启 sing-box"
    echo -e "——————————————————————————————"
    echo -e " ${Green_font_prefix}6.${Font_color_suffix} 查看 配置文件"
    echo -e " ${Green_font_prefix}7.${Font_color_suffix} 查看 Surge 节点"
    echo -e " ${Green_font_prefix}8.${Font_color_suffix} 查看 运行状态"
    echo -e " ${Green_font_prefix}9.${Font_color_suffix} 查看 实时日志"
    echo -e "——————————————————————————————"
    echo -e " ${Green_font_prefix}0.${Font_color_suffix} 更新脚本"
    echo -e " ${Green_font_prefix}00.${Font_color_suffix} 退出脚本"
    echo "=============================="

    if [[ -e ${singbox_bin} ]]; then
        checkStatus
        if [[ "$status" == "running" ]]; then
            echo -e " 当前状态: ${Green_font_prefix}已安装${Font_color_suffix}并${Green_font_prefix}已启动${Font_color_suffix}"
        else
            echo -e " 当前状态: ${Green_font_prefix}已安装${Font_color_suffix}但${Red_font_prefix}未启动${Font_color_suffix}"
        fi
    else
        echo -e " 当前状态: ${Red_font_prefix}未安装${Font_color_suffix}"
    fi
    echo

    read -e -p " 请输入数字:" num
    case "$num" in
        1) installSingbox ;;
        2) uninstallSingbox ;;
        3) startSingbox ;;
        4) stopSingbox ;;
        5) restartSingbox ;;
        6) viewConfigRaw ;;
        7) viewSurgeNode ;;
        8) viewStatus ;;
        9) viewLog ;;
        0) updateShell ;;
        00) exit 0 ;;
        *) echo -e "${Error} 请输入正确数字 ${Yellow_font_prefix}[0-9]${Font_color_suffix}" && sleep 2s && startMenu ;;
    esac

    echo ""
    read -e -p "按回车返回主菜单..." dummy
    startMenu
}

startMenu
