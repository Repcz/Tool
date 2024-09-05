// 2024-09-05 17:31:00
const url = $request.url;
let obj = JSON.parse($response.body);

// 检查URL是否包含特定路径
if (url.includes("/rest/n/feed/selectionFast?")) {
    // 遍历feeds.ad路径
    if (obj.feeds && Array.isArray(obj.feeds)) {
        obj.feeds = obj.feeds.filter(feed => {
            // 如果feed中包含ad对象，则过滤掉该feed
            if (feed.ad) {
                console.log("删除广告对象:", feed.ad);
                return false;
            }
            return true;
        });
    }
}

$done({ body: JSON.stringify(obj) });
