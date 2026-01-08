/*
脚本作者：Marol62926
引用地址：https://raw.githubusercontent.com/Marol62926/MarScrpt/main/picsart.js
*/
var body = $response.body;
var obj = JSON.parse(body);

obj = {
  "status": "success",
  "response": [{
    "status": "SUBSCRIPTION_PURCHASED",
    "is_trial": false,
    "order_id": "",
    "plan_meta": {
      "id": "com.picsart.studio.subscription_plus_yearly",
      "frequency": "yearly",
      "type": "renewable",
      "scope_id": "full",
      "product_id": "subscription_plus_yearly",
      "description": "plus"
    },
    "limitation": {
      "max_count": 10,
      "limits_exceeded": false
    },
    "expire_date": 1872518379000,
    "purchase_date": 1651639906000,
    "subscription_id": "com.picsart.studio.subscription_plus_yearly",
    "original_order_id": "",
    "is_eligible_for_grant": false,
    "is_eligible_for_introductory": false,
    "reason": "ok"
  }]
}

body = JSON.stringify(obj);
$done({body});