// 2024-07-11 07:57:09
var json = JSON.parse($response.body);

// 移除热点板块信息流广告
if (json.result && json.result.links && Array.isArray(json.result.links)) {
    json.result.links.forEach(function(link) {
        if (link.content_type === 27) {
            var propertiesToDelete = [
                "title",
                "ad_pm",
                "img_gif",
                "idea_id",
                "ad_report",
                "label",
                "source",
                "intranet_only",
                "ad_cm",
                "content_type",
                "protocol",
                "img",
                "ad_ratio"
            ];

            propertiesToDelete.forEach(function(prop) {
                delete link[prop];
            });
        }
    });
}

$done({ body: JSON.stringify(json) });