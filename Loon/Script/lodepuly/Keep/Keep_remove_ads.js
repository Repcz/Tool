// 2024-09-06 21:02:25
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/config/v3/basic")) {
    if (obj.data && obj.data.homeTabs) {
        // 过滤掉name为"活动"的tab
        obj.data.homeTabs = obj.data.homeTabs.filter(tab => tab.name !== "活动");

        // 修改default值
        if (obj.data.homeTabs[1]) obj.data.homeTabs[1].default = true;
        if (obj.data.homeTabs[2]) obj.data.homeTabs[2].default = false;
    }
}

$done({ body: JSON.stringify(obj) });