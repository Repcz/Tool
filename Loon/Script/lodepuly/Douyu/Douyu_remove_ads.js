// 2024-07-29 16:48:55
const url = $request.url;
let obj = JSON.parse($response.body);

if (url.includes("/mgapi/livenc/home/getRecV3")) {
    function removeAds(data) {
        return data.filter(item => !item.ad);
    }

    if (obj.data && obj.data.rec_cont) {
        obj.data.rec_cont = removeAds(obj.data.rec_cont);
    }
    if (obj.data && obj.data.rec_card) {
        // obj.data.rec_card.card_banner = removeAds(obj.data.rec_card.card_banner);
        for (let i in obj.data.rec_card) {
            var v = obj.data.rec_card[i]
            if (v.card_banner) {
                v.card_banner = removeAds(v.card_banner)
            }
        }
    }
}

if (url.includes("/japi/entrance/roomRes/nc/m/list")) {
    if (obj.data) {
        delete obj.data.pendant_a; // 直播间悬浮窗
        delete obj.data.entrance_d; // 直播间宝箱
    }
}

if (/^\/venus\/config\/static\/update\?aid=ios&client_sys=ios&keyCodeSet=flow_config$/.test(url)) {
    const keysToZero = {
        "greatGodGameSitterSwitch": 0, // 大神游戏陪玩
        "followMoreAnchorEntrance": 0, // 关注更多主播入口
        "sdklivebanner": 0, // 直播横幅
        "homeActFloatSwitch": 0, // 首页活动悬浮窗
        "bringGoodsSwitch": 0, // 带货开关
        "qqGameSwitch": 0 // QQ游戏
    };

    if (obj.data) {
        for (let key in keysToZero) {
            if (obj.data.hasOwnProperty(key)) {
                obj.data[key] = keysToZero[key];
            }
        }
    }
}

$done({ body: JSON.stringify(obj) });