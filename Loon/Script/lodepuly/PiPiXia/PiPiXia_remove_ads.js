// 2024-09-09 09:43:18
const url = $request.url;
let obj = JSON.parse($response.body);

// 处理 /bds/feed/stream/v2/ 路径
if (url.includes("/bds/feed/stream/v2/")) {
    if (obj.data && obj.data.data && Array.isArray(obj.data.data)) {
        obj.data.data = obj.data.data.filter(item => !item.ad_info);
    }
}

// 处理 /bds/user/check_in/ 路径
if (url.includes("/bds/user/check_in/")) {
    if (obj.data && obj.data.profile_entrances && Array.isArray(obj.data.profile_entrances)) {
        obj.data.profile_entrances = obj.data.profile_entrances.filter(item => item.title !== "放心借" && item.title !== "洋钱罐借款");
    }
    if (obj.data && obj.data.pet_interface_message) {
        delete obj.data.pet_interface_message;
    }
}

$done({ body: JSON.stringify(obj) });