// 2024-05-11 18:12:16
var data = JSON.parse($response.body);
var ads = data.data[0].ad_data;
ads.forEach(function (adData) {
    adData.landing_page_url = "";
    adData.path = "";
    adData.ad_url_list = "";
    adData.check_ad_clicks = "";
    adData.check_ad_end_downloads = "";
    adData.check_ad_end_installs = "";
    adData.check_ad_fail_deep_links = "";
    adData.check_ad_landing_page = "";
    adData.check_ad_landing_page_fail = "";
    adData.check_ad_landing_page_success = "";
    adData.check_ad_open_deep_links = "";
    adData.check_ad_start_downloads = "";
    adData.check_ad_start_installs = "";
    adData.check_ad_success_deep_links = "";
    adData.check_ad_views = "";
});
// console.log(data);
$done({ body: JSON.stringify(data) });