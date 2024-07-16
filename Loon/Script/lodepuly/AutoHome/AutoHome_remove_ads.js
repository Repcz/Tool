// 2024-07-17 05:18:54
let url = $request.url;
let obj = JSON.parse($response.body);

// 删除社区广场 - 广告轮播图
if (/^\/club_v\d\.\d\.\d\/club\/index\/businessv\d+$/.test(url)) {
    delete obj.result.bannerlist;
}

// 删除选车 - 直播浮窗
if (url.includes("/carstreaming/selectcarportal/reclist")) {
    delete obj.result.liveinfo;
}

// 删除选车 - 直播浮窗
if (url.includes("/carstreaming/selectcarportal/seriestopwithtagscard")) {
    delete obj.result.toplist[1];
}

// 删除二手车 - 竖版轮播图
if (url.includes("/apic/v3/gethomepagefeed")) {
    delete obj.result.otherlist[0]; 
}

// 删除我的页面 - 移除添加我的爱车领券
if (url.includes("/platform/carserver/carcard/mycardv7")) {
    delete obj.result.nocartext;
}

// 遍历关键词删除所属对象
function removeItemsWithKeywords(data) {
    if (Array.isArray(data)) {
        data = data.filter(item => {
            return !item.text || !["低息借钱", "分期购车", "车主贷"].some(keyword => item.text.includes(keyword));
        });
    } else if (typeof data === 'object') {
        for (let key in data) {
            if (data[key] && typeof data[key] === 'object') {
                removeItemsWithKeywords(data[key]);
            }
        }
    }
}

if (/^https:\/\/(a\.athm\.cn\/)?mobile\.app\.autohome\.com\.cn\/platform\/carserver\/((usercenter\/getservicecards)|(carcard\/(mycardv7|allcard)))/.test(url)) {
    removeItemsWithKeywords(obj);
}

$done({ body: JSON.stringify(obj) });