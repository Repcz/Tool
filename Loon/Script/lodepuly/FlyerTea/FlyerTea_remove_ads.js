/*
脚本引用 https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/flyert.js
脚本时间 2024-07-10 08:18:08
*/
/*
let body = $response.body;
let headers = $response.headers;
const isResponse = typeof $response !== "undefined";
const isJson = headers["Content-Type"] == "application/json";
if(isResponse && isJson){
  let obj = JSON.parse(body);
  if(obj?.Variables){
    let variables = obj.Variables;
    if(variables.data && variables.data.adv){
      variables.data.adv={};
    }
  }
  body = JSON.stringify(obj);
  $done({ body });
}else{
  $done();
}

*/
var json = JSON.parse($response.body);

// 删除 Variables.data.xinren 路径
delete json.Variables.data.xinren;

// 删除 Variables.data 下指定路径的值
var pathsToClear = [
    "goodhotel",
    "goodhotel_txt",
    "goodthread",
    "goodthread_txt",
    "homeinns_already_joined",
    "homeinns_entry",
    "homeinns_entry_banner",
    "homeinns_entry_url"
];

pathsToClear.forEach(function(path) {
    if (json.Variables && json.Variables.data && json.Variables.data[path]) {
        json.Variables.data[path] = {};
    }
});

$done({ body: JSON.stringify(json) });