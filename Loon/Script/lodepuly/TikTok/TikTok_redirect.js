/*
脚本引用https://raw.githubusercontent.com/Keywos/rule/main/loon/tk.js
*/
let keyus={台湾: "TW", 日本: "JP", 韩国: "KR", 泰国: "TH", 越南: "VN", 英国: "UK", 法国: "FR", 德国: "DE", 美国: "US", 巴西: "BR", 俄罗斯: "RU", 墨西哥: "MX", 土耳其: "TR", 西班牙: "ES", 阿根廷: "AR", 新加坡: "SG", 菲律宾: "PH", 马来西亚: "MY"},
lk = $persistentStore.read("解锁地区"),loc = keyus[lk] || "KR",url = $request.url;
// if(loc == "inkey"){
//   inkeys = $persistentStore.read("手动输入地区代码[可选]");
//   loc = inkeys
// }
if (/(tnc|dm).+\.[^\/]+\.com\/\w+\/v\d\/\?/.test(url)) {
  url = url.replace(/\/\?/g,'');
  const response = {
    status: 302,
    headers: {Location: url},
  };
  $done({response});
} else if (/_region=CN&|&mcc_mnc=4/.test(url)) {
  url = url.replace(/_region=CN&/g,`_region=${loc}&`).replace(/&mcc_mnc=4/g,"&mcc_mnc=2");
  const response = {
    status: 307,
    headers: {Location: url},
  };
  $done({response});
} else {
  $done({})
}
