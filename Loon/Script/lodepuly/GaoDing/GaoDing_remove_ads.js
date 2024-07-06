// 2024-07-06 23:06:39

var json = JSON.parse($response.body);

if ($request.url.includes("/oc/exhibitions/template/resources")) {
    // 移除首页轮播图
    if (json.pits && json.pits[0]) {
        delete json.pits[0].delivery_materials;
    }
    // // 移除首页会员入口
    // if (json.pits && json.pits[1]) {
    //     delete json.pits[1].materials;
    // }
}

if ($request.url.includes("/oc/exhibitions/app_mine/resources")) {
    // 移除我的页面轮播图
    if (json.pits && json.pits[2]) {
        delete json.pits[2].delivery_materials;
    }
}

$done({ body: JSON.stringify(json) });