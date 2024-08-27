/*
脚本原创@Keywos
*/
let obj = JSON.parse($response.body);
obj.data.splashConfNew.forEach(item => {
  item.aliveTime = 0;
  item.urlX = "";
  item.url = "";
  item.title = "去开屏广告";
  item.status = item.status.replace("ON", "OFF");
});
$done({ body: JSON.stringify(obj) });