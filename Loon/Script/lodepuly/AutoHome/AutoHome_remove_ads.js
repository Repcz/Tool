// 2024-07-17 10:39:22
let url = $request.url;
try {
    let obj = JSON.parse($response.body);

    // 删除首页 - 左上角以旧换新
    if (/\/news_v\d+(?:\.\d+){2}\/news\/homenavigation/.test(url)) {
        delete obj.result.leftops;
    }

    // 删除社区广场 - 广告轮播图
    if (/\/club_v\d+(?:\.\d+){2}\/club\/index\/businessv\d+/.test(url)) {
        delete obj.result.bannerlist;
    }

    // 删除选车 - 直播浮窗
    if (url.includes("/carstreaming/selectcarportal/reclist")) {
        delete obj.result.liveinfo;
    }

    // 删除选车 - 新车报价页面直播内容
    function removeItemsWithKeywords(obj, targetValue) {
        function hasTargetValue(o, value) {
          return Object.values(o).includes(value);
        }
        
        function recursiveRemove(o) {
          if (Array.isArray(o)) {
            return o.filter(item => !hasTargetValue(item, targetValue))
                    .map(item => recursiveRemove(item));
          } else if (typeof o === 'object' && o !== null) {
            let newObj = {};
            for (let key in o) {
              if (hasTargetValue(o[key], targetValue)) {
                continue;
              }
              newObj[key] = recursiveRemove(o[key]);
            }
            return newObj;
          }
          return o;
        }
        return recursiveRemove(obj);
    }

    if (url.includes("/carstreaming/selectcarportal/seriestopwithtagscard")) {
        obj = removeItemsWithKeywords(obj, "直播中");
        obj = removeItemsWithKeywords(obj, "报价中");
    }

    // 删除二手车 - 竖版轮播图
    if (/\/apic\/v\d+\/gethomepagefeed\//.test(url)) {
        obj = removeItemsWithKeywords(obj, "车抵贷");
    }

    // 删除我的页面 - 移除添加我的爱车领券
    if (/\/platform\/carserver\/carcard\/mycard\d+/.test(url)) {
        delete obj.result.nocartext;
    }

    // 遍历关键词删除所属对象
    if (/\/platform\/carserver\/((usercenter\/getservicecards)|(carcard\/(mycardv\d+|allcard)))/.test(url)) {
        obj = removeItemsWithKeywords(obj, "低息借钱");
        obj = removeItemsWithKeywords(obj, "分期购车");
        obj = removeItemsWithKeywords(obj, "车主贷");
    }

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.error(e);
    $done({ body: $response.body });
}