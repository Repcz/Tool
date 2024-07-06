// 2024-07-06 12:01:26

const url = $request.url;
let obj;
try {
    obj = JSON.parse($response.body);
} catch (error) {
    console.error("JSON 解析错误：", error);
    $done({});
    return;
}

// 清理侧拉抽屉
if (url.includes("/sidebar/home")) {
    delete obj.vip_banner;
    delete obj.tools;
    }

// 清理会员横幅、金融板块、小程序
if (url.includes("/user/profile")) {
    delete obj.vip_banner; // 会员
    delete obj.finance_tab; // 金融
    delete obj.namoaixud_entry; // 金融
    delete obj.zone_info; // 金融
    delete obj.banner; // 金融
    delete obj.duxiaoman_entry; // 金融
    delete obj.recom_naws_list; // 小程序
}

if (obj.hasOwnProperty("user") && obj["user"].hasOwnProperty("user_growth")) {
    delete obj["user"]["user_growth"];
}

const typesToRemove = [60, 53,  58, 50, 10, 64, 51, 52, 55, 57, 62];

if (obj.custom_grid && Array.isArray(obj.custom_grid)) {
    obj.custom_grid = obj.custom_grid.filter(item => !typesToRemove.includes(item.type));
}

if (url.includes('c/s/sync')) {
    delete obj.floating_icon?.homepage?.icon_url;
    delete obj.floating_icon?.pb?.icon_url
    delete obj.mainbar;
    delete obj.duxiaoman_url;
    delete obj.whitelist;
    delete obj.yy_live_tab;
}

if (url.includes("/livefeed/feed")) {
    delete obj.data?.banner?.items;
}

$done({body: JSON.stringify(obj)});

