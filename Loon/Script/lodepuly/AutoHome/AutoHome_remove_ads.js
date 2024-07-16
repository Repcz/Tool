// 2024-07-17 07:32:53
let url = $request.url;
let obj = JSON.parse($response.body);

// 删除社区广场 - 广告轮播图
if (/\/club_v\d+(?:\.\d+){2}\/club\/index\/businessv\d+/.test(url)) {
    delete obj.result.bannerlist;
}

// 删除选车 - 直播浮窗
if (url.includes("/carstreaming/selectcarportal/reclist")) {
    delete obj.result.liveinfo;
}

// 删除选车 - 新车报价页面直播内容
function removeItemsWithKeywordsForLive(data) {
    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            if (item.text && ["直播中"].some(keyword => item.text.includes(keyword))) {
                data.splice(index, 1);
            }
        });
    } else if (typeof data === 'object') {
        for (let key in data) {
            if (data[key] && typeof data[key] === 'object') {
                removeItemsWithKeywordsForLive(data[key]);
            }
        }
    }
}

if (url.includes("/carstreaming/selectcarportal/seriestopwithtagscard")) {
    removeItemsWithKeywordsForLive(obj);
}

// 删除二手车 - 竖版轮播图
if (/apic\/v\d+\/gethomepagefeed/.test(url)) {
    delete obj.result.otherlist[0]; 
}

// 删除我的页面 - 移除添加我的爱车领券
if (/\/platform\/carserver\/carcard\/mycard\d+/.test(url)) {
    delete obj.result.nocartext;
}

// 遍历关键词删除所属对象
function removeItemsWithKeywordsForLoans(data) {
    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            if (item.text && ["低息借钱", "分期购车", "车主贷"].some(keyword => item.text.includes(keyword))) {
                data.splice(index, 1);
            }
        });
    } else if (typeof data === 'object') {
        for (let key in data) {
            if (data[key] && typeof data[key] === 'object') {
                removeItemsWithKeywordsForLoans(data[key]);
            }
        }
    }
}

if (/\/platform\/carserver\/((usercenter\/getservicecards)|(carcard\/(mycardv\d+|allcard)))/.test(url)) {
    removeItemsWithKeywordsForLoans(obj);
}

$done({ body: JSON.stringify(obj) });