// 2024-07-06 22:29:43
var json = JSON.parse($response.body);

// 检查 URL 路径是否包含 /oc/exhibitions/template/resources
if ($request.url.includes("/oc/exhibitions/template/resources")) {
    // 设置 pits[2].delivery_materials 的所有属性值为空字符串
    if (json.pits && json.pits[0] && json.pits[0].delivery_materials) {
        json.pits[0].delivery_materials.forEach(function (bannerData) {
            for (var prop in bannerData) {
                bannerData[prop] = "";
            }
        });
    }
}

// 检查 URL 路径是否包含 /oc/exhibitions/app_mine/resources
if ($request.url.includes("/oc/exhibitions/app_mine/resources")) {
    // 设置 pits[2].delivery_materials 的所有属性值为空字符串
    if (json.pits && json.pits[2] && json.pits[2].delivery_materials) {
        json.pits[2].delivery_materials.forEach(function (bannerData) {
            for (var prop in bannerData) {
                bannerData[prop] = "";
            }
        });
    }
}

$done({ body: JSON.stringify(json) });