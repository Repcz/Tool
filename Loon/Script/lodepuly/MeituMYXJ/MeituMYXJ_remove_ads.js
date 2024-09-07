/// 2024-09-07 21:19:26
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/operation/home.json")) {
    // 遍历 func_list
    if (obj.list && obj.list.func_list) {
        obj.list.func_list = obj.list.func_list.filter(item => {
            return item.name !== "借钱" && item.name !== "AI剪辑";
        });
    }

    // 遍历 func_bar_type
    if (obj.list && obj.list.func_bar_type) {
        obj.list.func_bar_type = obj.list.func_bar_type.filter(item => {
            return item.func_bar_type !== 8;
        });
    }
}

$done({ body: JSON.stringify(obj) });