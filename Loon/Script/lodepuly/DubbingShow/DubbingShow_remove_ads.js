// 2024-07-18 17:27:32
const body = $response.body;

if (!body) $done({});

let obj = JSON.parse(body);

if (obj.data && obj.data.banners) {
    delete obj.data.banners; // 移除语聊横幅
}

$done({ body: JSON.stringify(obj) });