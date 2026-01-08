// 2024-07-09 16:22:53
var json = JSON.parse($response.body);

// 删除 - 我的页面推广语
delete json.activity;

// 删除 - 底栏商城入口
delete json.tab_conf["tab_360Mall"];

// 删除 - 广告配置
delete json.ad_conf;

$done({ body: JSON.stringify(json) });