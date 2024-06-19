// 2024-05-11 23:26:52
var json = JSON.parse($response.body);
var banner = json.pits[0].delivery_materials;
banner.forEach(function (bannerData) {
    for (var prop in bannerData) {
        bannerData[prop] = "";
    }
});
// console.log(json);
$done({ body: JSON.stringify(json) });