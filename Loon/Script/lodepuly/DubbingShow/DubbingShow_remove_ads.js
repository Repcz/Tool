// 2024-07-18 17:58:12
const url = $request.url;
const body = $response.body;

if (!body) $done({});

function removeDataWithKeyword(array) {
    if (Array.isArray(array)) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i].data && array[i].data.includes("金币哦")) {
                array.splice(i, 1);
            }
        }
    }
}

try {
    let obj = JSON.parse(body);

    if (url.includes("/Api/live/LiveList")) {
        delete obj.data.banners; // 首页 - 推荐 - 语聊横幅
    } else if (url.includes("/api/live/FollowList")) {
        delete obj.data; // 首页 - 推荐 - 语聊关注推荐
    } else if (url.includes("/Api/Friend/GetRecommendUsers")) {
        delete obj.data; // 首页 - 关注推荐
    } else if (url.includes("/api/Union/HomeData")) {
        delete obj.data; // 消息 - 群聊推荐
    }

    if (url.includes("/Api/Film/GetConfigValue")) {
        if (obj.data && Array.isArray(obj.data)) {
            removeDataWithKeyword(obj.data);
        }
    }

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.error("JSON parsing error:", e);
    $done({});
}
