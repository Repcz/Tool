/*
引用地址https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/amdc.js
*/
// 2023-08-24 12:45

const url = $request.url;
const header = $request.headers;
const isQuanX = typeof $task !== "undefined";
let ua = header["User-Agent"] || header["user-agent"];

if (url.includes("/amdc/mobileDispatch")) {
  if (
    ua.includes("AMapiPhone") || // 高德地图
    ua.includes("Alibaba") || // 阿里巴巴
    ua.includes("Cainiao4iPhone") || // 菜鸟
    ua.includes("%E9%A3%9E%E7%8C%AA%E6%97%85%E8%A1%8C") // 飞猪旅行
  ) {
    if (isQuanX) {
      $done({ status: "HTTP/1.1 404 Not Found" });
    } else {
      $done();
    }
  } else {
    $done({});
  }
} else {
  $done({});
}
