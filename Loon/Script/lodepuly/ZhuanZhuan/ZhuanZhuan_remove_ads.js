/*
# 信息流轮播推广
respData.infoData[1].rotateResource
# 悬浮窗
respData.userRed


# 测一测手机能卖多少钱
respData.bmNewInfo
# 我的钱包
respData.itemGroupList[2].itemList[0].walletInfo
*/
// 2024-06-30 00:41:26
let data = JSON.parse($response.body);

// 删除信息流轮播推广
data.respData?.infoData?.[1]?.rotateResource && delete data.respData.infoData[1].rotateResource;

// 删除悬浮窗
data.respData?.userRed && delete data.respData.userRed;

// 删除测一测手机能卖多少钱
data.respData?.bmNewInfo && delete data.respData.bmNewInfo;

// 删除我的钱包
data.respData?.itemGroupList?.[2]?.itemList?.[0]?.walletInfo && delete data.respData.itemGroupList[2].itemList[0].walletInfo;

$done({ body: JSON.stringify(data) });