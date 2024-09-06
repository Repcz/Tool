// 2024-09-06 19:48:00
const url = $request.url;
let obj = JSON.parse($response.body);

// 检查URL是否包含/config/v3/basic
if (url.includes("/config/v3/basic")) {
    // 遍历data.homeTabs
    if (obj.data && obj.data.homeTabs && Array.isArray(obj.data.homeTabs)) {
        obj.data.homeTabs = obj.data.homeTabs.filter(tab => {
            // 检查name是否为"活动"
            if (tab.name === "活动") {
                console.log('删除活动标签');
                return false; // 删除该对象
            }
            return true; // 保留该对象
        });
    }
}

$done({ body: JSON.stringify(obj) });
