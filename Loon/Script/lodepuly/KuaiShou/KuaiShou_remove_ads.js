// 2024-09-05 17:31:00
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/rest/n/feed/selectionFast")) {
    if (obj.feeds && Array.isArray(obj.feeds)) {
        obj.feeds = obj.feeds.reduce((acc, item) => {
            if (!item.hasOwnProperty('ad')) {
                acc[item.id] = item; // 假设每个feed都有一个唯一的id字段
            }
            return acc;
        }, {});
    }
}

$done({ body: JSON.stringify(obj) });
