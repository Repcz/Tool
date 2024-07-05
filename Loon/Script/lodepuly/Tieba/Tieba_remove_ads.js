// 2024-07-05 21:19:40
var json = JSON.parse($response.body);

// 删除金融内容
if (json.finance_tab) {
    delete json.finance_tab;
}

if (json.namoaixud_entry) {
    delete json.namoaixud_entry;
}

if (json.zone_info) {
    delete json.zone_info;
}

if (json.banner) {
    delete json.banner;
}
if (json.duxiaoman_entry) {
    delete json.duxiaoman_entry;
}

// 删除小程序列表
if (json.recom_naws_list) {
    delete json.recom_naws_list;
}

if (json.recom_swan_list) {
    delete json.recom_swan_list;
}

// console.log(json);
$done({ body: JSON.stringify(json) });