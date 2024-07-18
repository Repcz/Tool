// 2024-07-19 02:08:05
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

const regexUnifiedFeed = /\/v1\/graph\/unified_feed/; // 社区 - 广场轮播图
const regexTabList = /\/v\d\/ironman\/discovery_v\d\/tab_list_v\d/; // 首页 - 热门 - 顶部标签
const regexConfigs = /\/v\d\/graph\/homepage\/comicVideo\/v\d\/configs/; // 社区 - 发现 - 顶部标签

const targetTitles = ["KK评委", "2024新漫报到", "VIP"]; // 首页 - 热门 - 顶部标签
const targetDescs = ["超级漫画节", "在kk当评委", "屈臣氏·KKCOS大赏", "KK朋友圈", "KK运势"]; // 社区 - 发现 - 顶部标签

function removeObjectsWith(obj, key, targets) {
    if (Array.isArray(obj)) {
        return obj.filter(item => !item[key] || !targets.includes(item[key]));
    } else if (typeof obj === 'object' && obj !== null) {
        for (let k in obj) {
            if (obj[k] && typeof obj[k] === 'object') {
                if (obj[k][key] && targets.includes(obj[k][key])) {
                    delete obj[k];
                } else {
                    obj[k] = removeObjectsWith(obj[k], key, targets);
                }
            }
        }
    }
    return obj;
}

if (regexTabList.test(url)) {
    obj = removeObjectsWith(obj, 'title', targetTitles);
}

if (regexConfigs.test(url)) {
    obj = removeObjectsWith(obj, 'desc', targetDescs);
}

// 应用配置修改
if (url.includes("/ironman/comic/recommend")) {
    delete obj.data.operation_float_ball;
    delete obj.data.topic_goods;
    delete obj.data.total_coupon;
    delete obj.data.share_comics_page_lottery;
}

if (obj.loopBanner) {
    delete obj.loopBanner; // 社区 - 广场轮播图
}

$done({ body: JSON.stringify(obj) });
