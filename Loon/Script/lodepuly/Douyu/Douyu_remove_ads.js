// 2024-08-28 08:44:23
const url = $request.url;
let obj;

try {
    obj = JSON.parse($response.body);
} catch (e) {
    console.error("Failed to parse JSON:", e);
    $done({ body: $response.body });
    return;
}

if (url.includes("/mgapi/livenc/home/getRecV3")) {
    function removeAds(data) {
        return data.filter(item => !item.ad);
    }

    if (obj.data && obj.data.rec_cont) {
        obj.data.rec_cont = removeAds(obj.data.rec_cont);
    }
    if (obj.data && obj.data.rec_card) {
        for (let i in obj.data.rec_card) {
            let v = obj.data.rec_card[i];
            if (v.card_banner) {
                v.card_banner = removeAds(v.card_banner);
            }
        }
    }
}

$done({ body: JSON.stringify(obj) });
