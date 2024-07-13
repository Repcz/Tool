// 2024-07-14 03:12:16
var json = JSON.parse($response.body);

// 删除指定的路径
var pathsToDelete = [
    "result.cms_user_center_bussiness_banner_config", // 用户中心 - 横幅广告
    "result.cms_user_center_welfare_farm_entry_config", // 用户中心 - 芭芭农场、福利中心
    "result.cms_cloud_drive_transport_header_banner", // 云盘 - 传输页面横幅广告
    "result.qk_novel_noah_sdk_slot_bottom_banner", // 小说 - 底部横幅广告
    "result.cms_novel_bookshelf_banner", // 小说 - 书架横幅
    "result.cms_bookmarkAndHistory_banner_ad", // 书签和历史 - 横幅广告
    "result.paisou_benefit_banner", // 拍搜 - 横幅广告
    "result.novel_ad_flbanner_close", // 小说广告横幅关闭
    "result.noah_content_embed_ad_hc_vertical_scale_style", // 诺亚内容嵌入广告HC垂直扩展样式
    "result.minipg_ads_switch_quark", // 迷你PG广告开关夸克
    "result.noah_search_mid_page_ad_list", // 诺亚搜索中间页广告列表
    "result.noah_search_mid_ad_enable",// 诺亚搜索中广告启用
    "result.cms_web_ad_local_block_js", // CMS网站广告本地块JS
    "result.novel_paid_book_ad_density_newuser", // 小说付费书籍广告密度对新用户的影响
    "result.novel_ad_flbanner_cdtime", // 小说广告横幅CD时间
    "result.cms_sm_ad_request_handle_enable", // 启用CMS SM广告请求处理
    "result.novel_ad_space_count", // 小说广告空间计数
    "result.cms_sc_ad_request_handle_enable", // 启用CMS SC广告请求处理
    "result.noah_content_embed_ad_vertical_scale_style", // 诺亚内容嵌入广告垂直扩展风格
    "result.enable_miniframe_prefetch_ad", // 启用迷你框架预取广告
];

pathsToDelete.forEach(function(path) {
    var parts = path.split('.');
    var current = json;
    for (var i = 0; i < parts.length; i++) {
        if (i === parts.length - 1) {
            delete current[parts[i]];
        } else {
            current = current[parts[i]];
            if (!current) break;
        }
    }
});

$done({ body: JSON.stringify(json) });