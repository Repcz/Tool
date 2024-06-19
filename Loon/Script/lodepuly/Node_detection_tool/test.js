/**
 * @key
 * 2023-09-21 23:53:27
 * 此脚本仅支持Loon
 */

const scriptName = "代理路径查询";
(async () => {
  try {
    const loon = $loon.split(" ");
    let timein = parseInt($persistentStore.read("近端查询超时时间ms") ?? 2000),
      timei = parseInt($persistentStore.read("远端查询超时时间ms") ?? 5000),
      inputParams = $environment.params,nodeName = inputParams.node,nodeIp = inputParams.nodeInfo.address,
      INIPS = false, INFailed = "", ins = "", outs = "", serverip = serverTF(nodeIp),
      cfw = `          中转          `;
    if (serverip === "domain") {
      const Ali = await tKey(
        `http://223.5.5.5/resolve?name=${nodeIp}&type=A&short=1`,
        "",
        timein
      );
      if (Ali?.length > 0) {
        console.log("Ali inIp: " + Ali[0]);
        nodeIp = Ali[0];
        serverip = serverTF(nodeIp);
      } else {
        console.log("Ali Dns Failed: " + JSON.stringify(Ali, "", 2));
      }
    }
    const LD = await tKey(
      "http://ip-api.com/json/?lang=zh-CN",
      nodeName,
      timei
    );
    if (LD?.status === "success") {
      LDTF = true;
      console.log("LD: " + JSON.stringify(LD, "", 2));
      let { country, countryCode, regionName, city, query, isp, as, tk } = LD;
      var lquery = query;
      outs = `<b><font>远端国家</font>:</b>
        <font>${getflag(countryCode)}${country}&nbsp; ${tk}ms</font><br><br>
    
        <b><font>远端地区</font>:</b>
        <font>${countryCode} ${regionName} ${city}</font><br><br>
        
        <b><font>远端IP地址</font>:</b>
        <font>${query}</font><br><br>
    
        <b><font>远端ISP</font>:</b>
        <font>${isp}</font><br><br>
    
        <b><font>远端ASN</font>:</b>
        <font>${as}</font><br>`;
    } else {
      let LDFailed = "LD: " + JSON.stringify(LD);
      outs = `<br>LDFailed 查询超时<br><br>`;
      console.log(LDFailed);
    }
    if (nodeIp == lquery) {
      cfw = `          直连          `;
      const LO = await tKey(
        "https://api.live.bilibili.com/ip_service/v1/ip_service/get_ip_addr",
        "",
        timein
      );
      if (LO.code === 0) {
        let { addr, province, city, isp, country } = LO.data,
          tk = LO.tk;
        province == city && (province = "");
        country == "中国" && (country = "🇨🇳中国");
        isp = isp.replace(/.*广电.*/g, "广电");
        ins = `<b><font>本机国家</font>:</b>
        <font>${country}&nbsp; ${tk}ms</font><br><br>
        
        <b><font>本机近端</font>:</b>
        <font>${isp}</font><br><br>
      
        <b><font>本机IP</font>:</b>
        <font>${addr}</font><br><br>
    
        <b><font>本机位置</font>:</b>
        <font>${province} ${city} </font><br><br>`;
      } else {
        console.log("BIli api Failed: " + JSON.stringify(LO, "", 2));
        ins = `<br>BIli Api Failed 查询超时<br><br>`;
      }
    } else {
      if (serverip === "v4") {
        console.log("v4");
        const SP = await tKey(
          `https://api-v3.speedtest.cn/ip?ip=${nodeIp}`,
          "",
          timein
        );
        if (SP?.data?.country === "中国") {
          console.log("SP: " + JSON.stringify(SP.data, "", 2));
          let { country, city, province, district, countryCode, isp, ip } =
              SP.data,
            tk = SP.tk;
          city == district && (city = "");
          countryCode !== "CN" && (cfw = `          中转          `);
          ins = `<b><font>近端ISP</font>:</b>
        <font>${isp}</font><br><br>
      
        <b><font>近端国家</font>:</b>
        <font>${getflag(countryCode)}${country}&nbsp; ${tk}ms</font><br><br>
 
        <b><font>近端IP地址</font>:</b>
        <font>${ip}</font><br><br>
    
        <b><font>近端位置</font>:</b>
        <font>${province} ${city} ${district}</font><br><br>`;
        } else {
          INFailed = "SP Api Failed: " + JSON.stringify(SP);
          ins = `<br>SPFailed 查询超时<br><br>`;
          INIPS = true;
          console.log(INFailed);
        }
      } else {
        INIPS = true;
        console.log("v6");
      }
      if (INIPS) {
        const IO = await tKey(
          `http://ip-api.com/json/${nodeIp}?lang=zh-CN`,
          "",
          timei
        );
        if (IO?.status === "success") {
          console.log("IO: " + JSON.stringify(IO, "", 2));
          let { country, city, regionName, countryCode, isp, query } = IO,
            tk = IO.tk;
          regionName == city && (city = "");
          countryCode !== "CN" && (cfw = `          中转          `);
          ins = `<b><font>近端国家</font>:</b>
          <font>${getflag(countryCode)}${country}&nbsp; ${tk}ms</font><br><br>
      
          <b><font>近端ISP</font>:</b>
          <font>${isp}</font><br><br>
      
          <b><font>近端IPAPI</font>:</b>
          <font>${query}</font><br><br>
      
          <b><font>近端位置</font>:</b>
          <font>${regionName} ${city}</font><br><br>`;
        } else {
          INFailed = "IPApi Failed: " + JSON.stringify(IO);
          ins = `<br>INFailed 查询超时<br><br>`;
          console.log(INFailed);
        }
      }
    }

    let message = `<p 
    style="text-align: center; 
    font-family: -apple-system; 
    font-size: large; 
    font-weight: thin">
    <br>-------------------------------<br><br>
    ${ins}
    <b><font>${cfw}</font></b><br><br>
    ${outs}
  <br>-------------------------------<br><br>
    <b>节点</b>  ➟  ${nodeName} </p>`;
    $done({ title: scriptName, htmlMessage: message });
  } catch (error) {
    console.log("Errk: " + error.message);
    $done({
      title: scriptName,
      htmlMessage: error.message + "<br><br> 查询失败 反馈@Key",
    });
  } finally {
    $done({ title: scriptName, htmlMessage: 'See Log' });
  }
})();
function serverTF(t){if(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(t)){return"v4"}else if(/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(t)){return"v6"}else{return"domain"}}
function getflag(t){const n=t.toUpperCase().split("").map((t=>127397+t.charCodeAt()));return String.fromCodePoint(...n).replace(/🇹🇼/g,"🇨🇳")}
async function tKey(t,e,o){let r=1,s=1;const i=new Promise(((i,l)=>{const a=async f=>{try{const r=await Promise.race([new Promise(((n,o)=>{let r=Date.now();$httpClient.get({url:t,node:e},((t,e,s)=>{if(t){o(t)}else{let t=Date.now()-r;let o=e.status;switch(o){case 200:let o=e.headers["Content-Type"];switch(true){case o.includes("application/json"):let e=JSON.parse(s);e.tk=t;n(e);break;case o.includes("text/html"):n("text/html");break;case o.includes("text/plain"):let r=s.split("\n");let i=r.reduce(((n,e)=>{let[o,r]=e.split("=");n[o]=r;n.tk=t;return n}),{});n(i);break;case o.includes("image/svg+xml"):n("image/svg+xml");break;default:n("未知");break}break;case 204:let r={tk:t};n(r);break;default:n("nokey");break}}}))})),new Promise(((t,n)=>{setTimeout((()=>n(new Error("timeout"))),o)}))]);if(r){i(r)}else{i("超时");l(new Error(n.message))}}catch(t){if(f<r){s++;a(f+1)}else{i("检测失败, 重试次数"+s);l(t)}}};a(0)}));return i}