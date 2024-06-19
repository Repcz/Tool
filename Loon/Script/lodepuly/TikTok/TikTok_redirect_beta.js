/*
脚本引用https://raw.githubusercontent.com/Keywos/rule/main/loon/tk.js
*/
let keyus = { 台湾: "TW", 日本: "JP", 韩国: "KR", 泰国: "TH", 越南: "VN", 英国: "UK", 法国: "FR", 德国: "DE", 美国: "US", 巴西: "BR", 俄罗斯: "RU", 墨西哥: "MX", 土耳其: "TR", 西班牙: "ES", 阿根廷: "AR", 新加坡: "SG", 菲律宾: "PH", 马来西亚: "MY" },
  lk = $persistentStore.read("解锁地区"), loc = keyus[lk] || "JP", url = $request.url;
let keymccs = { 台湾: "46611", 日本: "44023", 韩国: "45005", 泰国: "52001", 越南: "45204", 英国: "23402", 法国: "20800", 德国: "26201", 美国: "310090", 巴西: "72416", 俄罗斯: "25001", 墨西哥: "334020", 土耳其: "28601", 西班牙: "21407", 阿根廷: "722010", 新加坡: "52501", 菲律宾: "51502", 马来西亚: "50213" };
let mccs = keymccs[lk] || "44023";
// if(loc == "inkey"){
//   inkeys = $persistentStore.read("手动输入地区代码[可选]");
//   loc = inkeys
// }
// 疑似TikTok检测MitM的地址
if (/(tnc|dm).+\.[^\/]+\.com\/\w+\/v\d\/\?/.test(url)) {
  url = url.replace(/\/\?/g, '');
  console.log(url)
  const response = {
    status: 302,
    headers: { Location: url },
  };
  $done({ response });
}
// URL请求重定向替换
else if (/_region=CN&|_region1=CN&|&mcc_mnc=\d+/.test(url)) {
  url = url.replace(/_region=CN&/g, `_region=${loc}&`).replace(/_region1=CN&/g, `_region1=${loc}&`).replace(/&mcc_mnc=\d+/g, `&mcc_mnc=${mccs}`);
  console.log(url)
  const response = {
    status: 307,
    headers: { Location: url },
  };
  $done({ response });
} else {
  $done({})
}