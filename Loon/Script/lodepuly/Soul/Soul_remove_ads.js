/*
脚本引用：https://raw.githubusercontent.com/ZenmoFeiShi/Qx/main/Soul.js
*/
//2024-06-16 18:40  感谢@可莉对去除开屏广告提供的帮助
const url = $request.url;
const scriptEnvironment = typeof $task !== 'undefined' ? 'Surge' : (typeof $loon !== 'undefined' ? 'Loon' : (typeof $httpClient !== 'undefined' ? 'Qx' : 'Unknown'));

if (!$response.body || scriptEnvironment === 'Unknown') {
  $done({});
}

let obj = JSON.parse($response.body);

const shouldDeleteData = (url) => {
  return url.includes("/post/homepage/guide/card") ||
         url.includes("/furion/position/content") ||
         url.includes("/hot/soul/rank") ||
         url.includes("/post/gift/list") ||
         url.includes("/mobile/app/version/queryIos") ||
         url.includes("/teenager/config") ||
         url.includes("/winterfell/v2/getIpByDomain") || 
         url.includes("/official/scene/module");
};

const shouldModifyLimitInfo = (url, obj) => {
  return url.includes("/chat/limitInfo") && obj.data && obj.data.limit !== undefined;
};

if (url.includes("/v6/planet/config")) {
  const gamesToRemove = [
    "异世界回响", "狼人魅影", "梦想海岛王", "幻想星球", "爆弹喵", "星球实验室", "兴趣群组", "群聊派对"
  ];
    
  if (obj.data && obj.data.gameInfo && Array.isArray(obj.data.gameInfo.gameCards)) {
    obj.data.gameInfo.gameCards = obj.data.gameInfo.gameCards.filter(card => !gamesToRemove.includes(card.title));
  }
  
  if (obj.data && Array.isArray(obj.data.coreCards)) {
    obj.data.coreCards = obj.data.coreCards.filter(card => !gamesToRemove.includes(card.title));        
    obj.data.coreCards.forEach(card => {
      if (card.secondCards && Array.isArray(card.secondCards)) {
        card.secondCards = card.secondCards.filter(sc => !gamesToRemove.includes(sc.title));
      }
    });
  }
}
if (obj && obj.data && obj.data.coreCards && Array.isArray(obj.data.coreCards)) {
  obj.data.coreCards = obj.data.coreCards.map(card => {
    if (card.style === 2) {
      card.style = 1;
    }
    return card;
  });
}

if (url.includes("/homepage/diamond/position/info")) {
    obj.data = obj.data.filter(item => item.code !== "PET_PLANET" && item.code !== "GIFT_WALL" && item.code !== "SHOP");
}

if (url.includes("/chatroom/chatClassifyRoomList")) {
  if (obj.data && obj.data.roomList) {
    obj.data.roomList = [];
  }
}
if (!obj.data || shouldDeleteData(url)) {
  delete obj.data;
}

if (shouldModifyLimitInfo(url, obj)) {
  obj.data.limit = false;
}

if (url.includes("/post/recSquare/subTabs")) {
  obj.data = obj.data.filter(item => [7, 6, 2].includes(item.tabType));
}

$done({ body: JSON.stringify(obj) });

