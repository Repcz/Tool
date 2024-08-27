// 2024-08-11 13:53:43
const url = $request.url;
let obj = JSON.parse($response.body);

// 删除首页信息流广告
if (url.includes("/gw/mtop.taobao.idlehome.home.nextfresh")) {
    const namesToRemove = [
        "fish_home_advertise_card_d4",
        "fish_home_feeds_pager_banner",
        "fish_home_content_card",
        "fish_home_feeds_commodity_card_2"
    ];

    if (obj.data && obj.data.sections) {
        obj.data.sections = obj.data.sections.filter(section => {
            if (section.template && namesToRemove.includes(section.template.name)) {
                return false;
            }
            return true;
        });
    }

    if (obj.data && obj.data.widgetReturnDO) {
        delete obj.data.widgetReturnDO;
    }
} else if (url.includes("/gw/mtop.taobao.idlehome.home.circle.list/")) {
    if (obj.data && obj.data.circleList) {
        obj.data.circleList.forEach(circle => {
            if (circle.showType) {
                circle.showType = "text"; // 将首页顶部标签模式修改为文本
            }
            if (circle.showInfo && circle.showInfo.titleImage) {
                delete circle.showInfo.titleImage; // 删除将首页顶部图片标签的资源
            }
        });
    }
}

$done({ body: JSON.stringify(obj) });