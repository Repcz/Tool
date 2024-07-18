// 2024-07-18 23:21:26
const url = $request.url;
const body = $response.body;

if (!body) $done({});

let obj = JSON.parse(body);

// 漫画推荐
if (url.includes("/ironman/comic/recommend")) {
    delete obj.data.operation_float_ball; // 悬浮窗
    delete obj.data.topic_goods; // 相关商品
    delete obj.data.total_coupon; // 优惠券
    delete obj.data.share_comics_page_lottery; // 分享漫画页面抽奖
}

$done({ body: JSON.stringify(obj) });
