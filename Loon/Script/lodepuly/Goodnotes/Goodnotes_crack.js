/*
脚本引用https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/break/goodnotes.js
*/
// 2023-08-10 15:45

const body = {};
const obj = JSON.parse((typeof $response !== "undefined" && $response.body) || null);
const gn6 = "com.goodnotes.gn6_one_time_unlock_3999";
const modData = { purchase_date: "2022-09-01T09:12:34Z" };

if (typeof $response === "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  body.headers = $request.headers;
} else if (obj && obj.subscriber) {
  obj.subscriber.subscriptions[gn6] = {
    original_purchase_date: "2022-09-01T09:12:34Z",
    purchase_date: "2022-09-01T09:12:34Z",
    store: "app_store",
    ownership_type: "PURCHASED"
  };
  obj.subscriber.entitlements["apple_access"] = modData;
  obj.subscriber.entitlements["apple_access"].product_identifier = gn6;
  obj.subscriber.entitlements["crossplatform_access"] = modData;
  obj.subscriber.entitlements["crossplatform_access"].product_identifier = gn6;
  body.body = JSON.stringify(obj);
}

$done(body);