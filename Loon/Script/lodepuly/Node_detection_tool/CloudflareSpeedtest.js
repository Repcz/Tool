/*
作者：@wuhu_zzz @xream @keywos @整点猫咪 技术指导：整点薯条 
整点花里胡哨
各种花里胡哨参数，通过argument传入，用=连接key及相应value，用&链接各种key，可以任意选择想填入的参数
title：标题
iconfast、iconmid、iconslow 分别对应测速快中慢时的图标
colorlow、colormid、colorhigh 分别对应延迟低中高时的图标颜色
mb参数：每次测试消耗的流量，默认1MB，经测试最大可4MB参数：&mb=4
配置实例：title=花里胡哨才是生产力&iconfast=bird&iconmid=hare&iconslow=tortoise&colorlow=#06D6A0&colormid=#FFD166&colorhigh=#EF476F

⚠️不想变化多端？？
可直接使用最基本的panel参数，title、icon、icon-color
配置实例：titile=不想花里胡哨了&icon=hare&icon-color=#CDCDCD
*/
const $ = new Env('network-speed')
let arg
if (typeof $argument != 'undefined') {
  arg = Object.fromEntries($argument.split('&').map(item => item.split('=')));
}
(async () => {
  const mb = $.lodash_get(arg, 'mb') || 10
  const bytes = mb * 1024 * 1024
  let up = {'url': 'https://speed.cloudflare.com/__up', timeout:3000}
  let down = {'url': `https://speed.cloudflare.com/__down?bytes=${bytes}`, timeout:3000}
  let cp = {'url': `https://speed.cloudflare.com/__up?bytes=${bytes}`, timeout:3000}
  // 兼容性修正
  if ($.isLoon()) {
      up = ReRequest(up, $environment?.params?.node);
      down = ReRequest(down, $environment?.params?.node);
      cp = ReRequest(cp, $environment?.params?.node);
  }
  else if ($.isQuanX()) {
      up = ReRequest(up, $environment?.params);
      down = ReRequest(down, $environment?.params);
      cp = ReRequest(cp, $environment?.params);
  }
  console.log('down:'+JSON.stringify(down));
  // 下行速率测试
  const Down_start = Date.now()
  let __Down = await $.http.get(down)
  const Down_end = Date.now()
  const duration = (Down_end - Down_start) / 1000
  const speed = mb / duration
  const Ping_start = Date.now()
  //延时测试
  let _Ping = await $.http.get(cp)
  const pingt = Date.now()-Ping_start
  const a = Diydecide(0,50,100,round(Math.abs(speed * 8)))
  const b = Diydecide(0,100,200,pingt) + 3
  let shifts = {
    '1': arg?.iconslow,
    '2': arg?.iconmid,
    '3': arg?.iconfast,
    '4': arg?.colorlow,
    '5': arg?.colormid,
    '6': arg?.colorhigh
  }
  icon = shifts[a]
  color = shifts[b]
  // 构造面板
  let Panel = {};
  if ($.isStash()) Panel.title = arg?.title ?? "网速测试"
  else Panel.title = arg?.title ?? "网速测试"
  if ($.isLoon()) {
      Panel.message = `------------------------------\n`
      + `下行速率：${round(Math.abs(speed * 8))}Mbps [${round(Math.abs(speed, 2), 1)}MB/s]\n`
      + `网络延时：${pingt}ms\n`
      + `测试用时：${round(Math.abs(duration, 2),2)}s\n`
      + `测试时间：${new Date().toTimeString().split(' ')[0]}\n`
      + `------------------------------\n`
      + '节点 ➟ ' + $environment.params.nodeInfo.name
  } else if ($.isQuanX()) {
      Panel.message = `------------------------------\n`
      + `下行速率：${round(Math.abs(speed * 8))}Mbps [${round(Math.abs(speed, 2), 1)}MB/s]\n`
      + `网络延时：${pingt}ms\n`
      + `测试用时：${round(Math.abs(duration, 2),2)}s\n`
      + `测试时间：${new Date().toTimeString().split(' ')[0]}\n`
      + `------------------------------\n`
      + '节点 ➟ ' + $environment.params
  } else if ($.isSurge() || $.isStash()) {
      if ($.isStash()) Panel.icon = arg?.icon ?? icon;
      else Panel.icon = arg?.icon ?? icon;
      Panel["icon-color"] = arg?.iconColor ?? color;
      if ($.isStash()) Panel.backgroundColor = arg?.backgroundColor ?? "#f6821f";
      Panel.content = `下行速率: ${round(Math.abs(speed * 8))}Mbps [${round(Math.abs(speed, 2), 1)}MB/s]\n`
      + `网络延时：${pingt}ms\n`
      + `测试用时：${round(Math.abs(duration, 2),2)}s\n`
      + `测试时间：${new Date().toTimeString().split(' ')[0]}\n`
  };
  $.log(JSON.stringify(Panel));
  $.done(Panel)
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())

function createRound(methodName) {
  const func = Math[methodName]
  return (number, precision) => {
    precision = precision == null ? 0 : precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292)
    if (precision) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      let pair = `${number}e`.split('e')
      const value = func(`${pair[0]}e${+pair[1] + precision}`)
      pair = `${value}e`.split('e')
      return +`${pair[0]}e${+pair[1] - precision}`
    
    }
    return func(number)   
  }
}
function round(...args) {
  return createRound('round')(...args)
}
//确定变量所在区间
function Diydecide(x,y,z,item) {
  let array = [x,y,z]
  array.push(item)
  return array.sort((a,b) => a-b).findIndex(i => i === item)
}

/**
 * Construct Redirect Reqeusts
 * @author VirgilClyne
 * @param {Object} request - Original Request Content
 * @param {Object} proxyName - Proxies Name
 * @return {Object} Modify Request Content with Policy
 */
function ReRequest(request = {}, proxyName = "") {
  $.log(`⚠ ${$.name}, Construct Redirect Reqeusts`, "");
  if (proxyName) {
    if ($.isLoon()) request.node = proxyName;
    if ($.isQuanX()) {
      if (request.opts) request.opts.policy = proxyName;
      else request.opts = { "policy": proxyName };
    };
    if ($.isSurge()) {
      delete request.id;
      request.headers["X-Surge-Policy"] = proxyName;
      request.policy = proxyName;
    };
    if ($.isStash()) request.headers["X-Stash-Selected-Proxy"] = encodeURI(proxyName);
    if ($.isShadowrocket()) $.logErr(`❗️${$.name}, ${Fetch.name}执行失败`, `不支持的app: Shadowrocket`, "");
  }
  $.log(`🎉 ${$.name}, Construct Redirect Reqeusts`, "");
  //$.log(`🚧 ${$.name}, Construct Redirect Reqeusts`, `Request:${JSON.stringify(request)}`, "");
  return request;
};

// prettier-ignore
function Env(t,s){class e{constructor(t){this.env=t}send(t,s="GET"){t="string"==typeof t?{url:t}:t;let e=this.get;return"POST"===s&&(e=this.post),new Promise((s,i)=>{e.call(this,t,(t,e,r)=>{t?i(t):s(e)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,s){this.name=t,this.http=new e(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,/*this.logSeparator="\n\n",*/this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,s)/*,this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)*/}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $environment&&$environment["surge-version"]}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,s=null){try{return JSON.parse(t)}catch{return s}}toStr(t,s=null){try{return JSON.stringify(t)}catch{return s}}getjson(t,s){let e=s;const i=this.getdata(t);if(i)try{e=JSON.parse(this.getdata(t))}catch{}return e}setjson(t,s){try{return this.setdata(JSON.stringify(t),s)}catch{return!1}}getScript(t){return new Promise(s=>{this.get({url:t},(t,e,i)=>s(i))})}runScript(t,s){return new Promise(e=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=s&&s.timeout?s.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,s,i)=>e(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s);if(!e&&!i)return{};{const i=e?t:s;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s),r=JSON.stringify(this.data);e?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(s,r):this.fs.writeFileSync(t,r)}}lodash_get(t,s,e){const i=s.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return e;return r}lodash_set(t,s,e){return Object(t)!==t?t:(Array.isArray(s)||(s=s.toString().match(/[^.[\]]+/g)||[]),s.slice(0,-1).reduce((t,e,i)=>Object(t[e])===t[e]?t[e]:t[e]=Math.abs(s[i+1])>>0==+s[i+1]?[]:{},t)[s[s.length-1]]=e,t)}getdata(t){let s=this.getval(t);if(/^@/.test(t)){const[,e,i]=/^@(.*?)\.(.*?)$/.exec(t),r=e?this.getval(e):"";if(r)try{const t=JSON.parse(r);s=t?this.lodash_get(t,i,""):s}catch(t){s=""}}return s}setdata(t,s){let e=!1;if(/^@/.test(s)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(s),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const s=JSON.parse(h);this.lodash_set(s,r,t),e=this.setval(JSON.stringify(s),i)}catch(s){const o={};this.lodash_set(o,r,t),e=this.setval(JSON.stringify(o),i)}}else e=this.setval(t,s);return e}getval(t){return this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,s){return this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash()?$persistentStore.write(t,s):this.isQuanX()?$prefs.setValueForKey(t,s):this.isNode()?(this.data=this.loaddata(),this.data[s]=t,this.writedata(),!0):this.data&&this.data[s]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,s=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status?e.status:e.statusCode,e.status=e.statusCode),s(t,e,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:r,body:o}=t;s(null,{status:e,statusCode:i,headers:r,body:o},o)},t=>s(t&&t.error||"UndefinedError"));else if(this.isNode()){let e=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,s)=>{try{if(t.headers["set-cookie"]){const e=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();e&&this.ckjar.setCookieSync(e,null),s.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t,a=e.decode(h,this.encoding);s(null,{status:i,statusCode:r,headers:o,rawBody:h,body:a},a)},t=>{const{message:i,response:r}=t;s(i,r,r&&e.decode(r.rawBody,this.encoding))})}}post(t,s=(()=>{})){const e=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[e](t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status?e.status:e.statusCode,e.status=e.statusCode),s(t,e,i)});else if(this.isQuanX())t.method=e,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:r,body:o}=t;s(null,{status:e,statusCode:i,headers:r,body:o},o)},t=>s(t&&t.error||"UndefinedError"));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[e](r,o).then(t=>{const{statusCode:e,statusCode:r,headers:o,rawBody:h}=t,a=i.decode(h,this.encoding);s(null,{status:e,statusCode:r,headers:o,rawBody:h,body:a},a)},t=>{const{message:e,response:r}=t;s(e,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,s=null){const e=s?new Date(s):new Date;let i={"M+":e.getMonth()+1,"d+":e.getDate(),"H+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in i)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[s]:("00"+i[s]).substr((""+i[s]).length)));return t}queryStr(t){let s="";for(const e in t){let i=t[e];null!=i&&""!==i&&("object"==typeof i&&(i=JSON.stringify(i)),s+=`${e}=${i}&`)}return s=s.substring(0,s.length-1),s}msg(s=t,e="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()||this.isShadowrocket()||this.isStash()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let s=t.openUrl||t.url||t["open-url"],e=t.mediaUrl||t["media-url"];return{openUrl:s,mediaUrl:e}}if(this.isQuanX()){let s=t["open-url"]||t.url||t.openUrl,e=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":s,"media-url":e,"update-pasteboard":i}}if(this.isSurge()||this.isShadowrocket()||this.isStash()){let s=t.url||t.openUrl||t["open-url"];return{url:s}}}};if(this.isMute||(this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash()?$notification.post(s,e,i,o(r)):this.isQuanX()&&$notify(s,e,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(s),e&&t.push(e),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,s){const e=!this.isSurge()||this.isShadowrocket()&&!this.isQuanX()&&!this.isLoon()&&!this.isStash();e?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(s=>setTimeout(s,t))}done(t={}){const s=(new Date).getTime(),e=(s-this.startTime)/1e3;/*this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`),this.log(),*/this.isSurge()||this.isShadowrocket()||this.isQuanX()||this.isLoon()||this.isStash()?$done(t):this.isNode()&&process.exit(1)}}(t,s)}
