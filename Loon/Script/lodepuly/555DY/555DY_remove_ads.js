// 2024-08-28 15:09:43
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/api/v1/movie/index_recommend?")) {
    if (obj.data) {
        obj.data = obj.data.filter(item => item.layout !== "advert_self");
    }

    for (let i in obj.data) {
      obj.data[i].list = obj.data[i].list.filter(item => item.type !== 3);
    }
}

$done({ body: JSON.stringify(obj) });