// 2024-08-13 17:11:12
const url = $request.url;
let obj = JSON.parse($response.body);

try {
    if (url.includes('/api/alexa/homepage/hub') && obj.result && Array.isArray(obj.result.bottom_tabs)) {
        obj.result.bottom_tabs = obj.result.bottom_tabs.filter(tab => tab.title !== '多多视频' && tab.title !== '大促会场' && tab.title !== '搜索' && tab.title !== '直播');
        delete obj.result.icon_set;
        delete obj.result.search_bar_hot_query;
        }
        
    if (url.includes("/search")) {
    delete obj.expansion;
         }
        
    if (url.includes('/api/philo/personal/hub')) {
        delete obj.monthly_card_entrance;
        delete obj.personal_center_style_v2_vo;
        if (obj.icon_set) {
            delete obj.icon_set.icons;
            delete obj.icon_set.top_personal_icons;
        }
    }

    if (url.includes("/api/oak/integration/render")) {
        if (obj.ui) {
            delete obj.ui.bottom_section;  // 限时
            if (obj.ui.live_section) {
                delete obj.ui.live_section.float_info;  // 直播
            }
        }
        delete obj.bottom_section_list; // 限时
    }
} catch (error) {
    
}

$done({body: JSON.stringify(obj)});