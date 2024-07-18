// 2024-07-19 00:29:00
const url = $request.url;
const body = $response.body;

if (!body) $done({});

let obj;
try {
    obj = JSON.parse(body);
} catch (e) {
    console.error("JSON parse error:", e);
    $done({});
}

// 首页 - 热门 - 顶部标签
const targetTitles = [
    "KK评委",
    "2024新漫报到",
    "VIP"
];

// 社区 - 发现 - 顶部标签
const targetDescs = [
    "超级漫画节",
    "在kk当评委",
    "屈臣氏·KKCOS大赏",
    "KK朋友圈",
    "KK运势"
];

const regexTabList = /\/v\d\/ironman\/discovery_v\d\/tab_list_v\d/; // 首页 - 热门 - 顶部标签
const regexConfigs = /\/v\d\/graph\/homepage\/comicVideo\/v\d\/configs/; // 社区 - 发现 - 顶部标签

function removeObjectsWithTitle(obj) {
    if (Array.isArray(obj)) {
        return obj.filter(item => {
            if (item.title && targetTitles.includes(item.title)) {
                return false;
            }
            if (item.title) {
                return true;
            }
            removeObjectsWithTitle(item);
            return true;
        });
    } else if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                if (obj[key].title && targetTitles.includes(obj[key].title)) {
                    delete obj[key];
                } else {
                    obj[key] = removeObjectsWithTitle(obj[key]);
                }
            }
        }
    }
    return obj;
}

function removeObjectsWithDesc(obj) {
    if (Array.isArray(obj)) {
        return obj.filter(item => {
            if (item.desc && targetDescs.includes(item.desc)) {
                return false;
            }
            if (item.desc) {
                return true;
            }
            removeObjectsWithDesc(item);
            return true;
        });
    } else if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                if (obj[key].desc && targetDescs.includes(obj[key].desc)) {
                    delete obj[key];
                } else {
                    obj[key] = removeObjectsWithDesc(obj[key]);
                }
            }
        }
    }
    return obj;
}

if (regexTabList.test(url)) {
    obj = removeObjectsWithTitle(obj);
}

if (regexConfigs.test(url)) {
    obj = removeObjectsWithDesc(obj);
}

// 配置修改
if (url.includes("/ironman/comic/recommend")) {
    delete obj.data.operation_float_ball; // 悬浮窗
    delete obj.data.topic_goods; // 相关商品
    delete obj.data.total_coupon; // 优惠券
    delete obj.data.share_comics_page_lottery; // 分享漫画页面抽奖
}

$done({ body: JSON.stringify(obj) });