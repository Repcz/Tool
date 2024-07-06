// 2024-07-06 17:29:35
var json = JSON.parse($response.body);
if (json.pits && json.pits[0]) {
    json.pits[0] = {};  // 首页轮播图
}
$done({ body: JSON.stringify(json) });