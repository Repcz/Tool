// 2024-07-17 09:16:53
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
    function removeItemsWithKeywords(data, keywords) {
        if (Array.isArray(data)) {
            data = data.filter(item => {
                return !item.text || !keywords.some(keyword => item.text.includes(keyword));
            });
        } else if (typeof data === 'object') {
            for (let key in data) {
                if (data[key] && typeof data[key] === 'object') {
                    data[key] = removeItemsWithKeywords(data[key], keywords);
                }
            }
        }
        return data;
    }

    if (url.includes("/carstreaming/selectcarportal/seriestopwithtagscard")) {
        obj = removeItemsWithKeywords(obj, ["直播中", "报价中"]);
    }

    // 删除二手车 - 竖版轮播图
    if (/\/apic\/v\d+\/gethomepagefeed\//.test(url)) {
        obj = removeItemsWithKeywords(obj, ["车抵贷"]);
    }

    // 删除我的页面 - 移除添加我的爱车领券
    if (/\/platform\/carserver\/carcard\/mycard\d+/.test(url)) {
        delete obj.result.nocartext;
    }

    // 遍历关键词删除所属对象
    if (/\/platform\/carserver\/((usercenter\/getservicecards)|(carcard\/(mycardv\d+|allcard)))/.test(url)) {
        obj = removeItemsWithKeywords(obj, ["低息借钱", "分期购车", "车主贷"]);
    }

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.error(e);
    $done({ body: $response.body });
}
