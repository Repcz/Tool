/*
引用地址https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/amap.js
*/
// 2024-06-11 20:25

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/boss/car/order/content_info")) {
  // 打车页面
  if (obj?.data?.lubanData?.skin?.dataList?.length > 0) {
    // oss营销皮肤
    obj.data.lubanData.skin.dataList = [];
  }
} else if (url.includes("/boss/order_web/friendly_information")) {
  // 打车页面
  const items = ["banners", "carouselTips", "integratedBanners", "integratedTips", "skins", "skinAndTips", "tips"];
  if (obj?.data?.["105"]) {
    for (let i of items) {
      delete obj.data["105"][i];
    }
  }
} else if (url.includes("/faas/amap-navigation/card-service-plan-home")) {
  // 路线规划页
  if (obj?.data?.children?.length > 0) {
    // 有schema参数的为推广
    obj.data.children = obj.data.children.filter((i) => !i.hasOwnProperty("schema"));
  }
} else if (url.includes("/faas/amap-navigation/main-page")) {
  // 首页底部卡片
  if (obj?.data?.cardList?.length > 0) {
    obj.data.cardList = obj.data.cardList.filter(
      (i) =>
        i?.dataKey === "ContinueNavigationCard" || // 继续导航
        i?.dataKey === "FrequentLocation" || // 常去地点
        i?.dataKey === "LoginCard" // 登陆卡片
    );
  }
  if (obj?.data?.mapBizList?.length > 0) {
    obj.data.mapBizList = obj.data.mapBizList.filter(
      (i) => i?.dataKey === "FindCarVirtualCard" // 显示关联车辆位置
    );
  }
} else if (url.includes("/perception/drive/routeInfo")) {
  // 导航详情页
  if (obj?.data?.tbt?.event?.length > 0) {
    obj.data.tbt.event = obj.data.tbt.event.filter((i) => !/ads-\d+/.test(i?.dynamic_id_s));
  }
  if (obj?.data?.front_end) {
    if (obj?.data?.front_end?.guide_tips?.length > 0) {
      // 音乐底栏
      obj.data.front_end.guide_tips = obj.data.front_end.guide_tips.filter((i) => i?.biz_type !== "music");
    }
    if (obj?.data?.front_end?.assistant) {
      // 助手皮肤
      delete obj.data.front_end.assistant;
    }
    if (obj?.data?.front_end?.download?.length > 0) {
      // 导航插播语音广告
      obj.data.front_end.download = obj.data.front_end.download.filter((i) => !/ads-\d+/.test(i?.dynamic_id_s));
    }
  }
} else if (url.includes("/perception/drive/routePlan")) {
  // 路线规划页
  const items = [
    "assistant", // 左上角悬浮动图
    "global_guide_data",
    "route_search",
    "start_button_tips" // 开始导航 悬浮提示 全国车道级
  ];
  if (obj?.data?.front_end) {
    for (let i of items) {
      delete obj.data.front_end[i];
    }
  }
  if (obj?.data?.tbt?.event?.length > 0) {
    // 导航插播语音广告
    obj.data.tbt.event = obj.data.tbt.event.filter((i) => !/ads-\d+/.test(i?.dynamic_id_s));
  }
  if (obj?.data?.front_end?.download?.length > 0) {
    // 导航插播语音广告
    obj.data.front_end.download = obj.data.front_end.download.filter((i) => !/ads-\d+/.test(i?.dynamic_id_s));
  }
} else if (url.includes("/promotion-web/resource")) {
  // 打车页面
  const items = [
    "alpha", // 出行优惠套餐
    "banner",
    "bravo", // 第三方推广 喜马拉雅月卡
    "bubble",
    "charlie", // 横版推广 单单立减 领专属优惠 体验问卷
    "icon",
    "other",
    "popup",
    "push", // 顶部通知 发单立享优惠
    "tips"
  ];
  if (obj?.data) {
    for (let i of items) {
      delete obj.data[i];
    }
  }
} else if (url.includes("/sharedtrip/taxi/order_detail_car_tips")) {
  // 打车页
  if (obj.data?.carTips?.data?.popupInfo) {
    delete obj.data.carTips.data.popupInfo;
  }
} else if (url.includes("/shield/dsp/profile/index/nodefaasv3")) {
  // 我的页面
  if (obj?.data?.cardList?.length > 0) {
    obj.data.cardList = obj.data.cardList.filter((i) => i?.dataKey === "MyOrderCard");
  }
  if (obj?.data?.tipData) {
    delete obj.data.tipData;
  }
  // 足迹
  // if (obj.data.footPrintV2) {
  //   delete obj.data.footPrintV2;
  // }
  // 成就勋章 lv1见习达人
  if (obj?.data?.memberInfo) {
    delete obj.data.memberInfo;
  }
} else if (url.includes("/shield/frogserver/aocs")) {
  // 整体图层
  const items = [
    // "ARWalkNavi", // AR导航
    // "Clipboard", // 剪贴板
    // "DIYMap", // DIY地图
    // "GuiJi", // 轨迹
    "Naviendpage_Searchwords",
    "SplashScreenControl",
    "TipsTaxiButton",
    // "TrainOrderBanner", // 火车票订单
    // "_testmark_info",
    // "_user_profile_",
    // "air_card",
    // "amap_basemap_config", // 基本库
    "amapCoin",
    // "aos_feedback",
    // "app_improve", // app改进
    // "apple_location_log_collect",
    // "collect",
    // "comment_info",
    // "deviceml_force_recommend",
    // "deviceml_update_apk_conf",
    "feedback_banner", // 店主专属通道
    "footprint", // 足迹
    // "gd_code_cover",
    // "gd_notch_logo",
    "his_input_tip",
    "home_business_position_config", // 首页右上角动图
    // "homepage_resource_config",
    // "hotcity", // 热门城市
    "hotel_activity",
    "hotel_fillin_opt",
    "hotel_loop",
    "hotel_portal",
    "hotel_tipsicon",
    "hotsaleConfig", // 酒店限时抢购
    // "icon_show",
    // "info_env_setting",
    // "ip_square",
    // "ip_square_share",
    // "isNewSearchMapCard", // 可能是足迹
    // "isPoiBubbleDisplay",
    // "lab_beta",
    // "lab_screenrecording",
    "landing_page_info", // 发现吃喝玩乐好去处
    // "list_action_drawer",
    // "listguide",
    // "map_environment_air",
    // "map_weather_switch", // 天气
    // "maplayers", // 赏花地图
    // "message_tab",
    "navi_end", // 导航结束 领油滴
    // "nearby",
    "nearby_business_popup",
    "nearby_map_entry_guide",
    "nearby_map_pull_down_guide",
    // "newcommentreply",
    // "nore_rec",
    "operation_layer", // 首页右上角图层
    // "photo_with_location",
    // "poi_rec",
    // "preword",
    // "profileHeaderPic",
    // "profiletTopBtn",
    // "recommend_api",
    // "recommend_key",
    // "redesign_user",
    // "renovate_control", // 今夜特价
    "route_banner", // 搜索路线 免费抽机票
    "routeresult_banner",
    "search_homepage",
    "search_keyword",
    "search_moni",
    "search_perf",
    "search_poi_recommend",
    "search_service_adcode",
    "search_word",
    "small_biz_b2b_kb", // 入驻高德
    "small_biz_case", // 推广
    "small_biz_fun",
    "small_biz_index",
    "small_biz_news",
    "splashscreen",
    "splashview_config",
    "sur_bar", // 十一特惠
    "taxi_activity", // 打车活动
    // "tel_retention_popup",
    "testflight_adiu",
    "tf_remind", // tf测试版
    // "third_party_places",
    "tips_bar_black_list",
    // "tips_hook",
    // "trackupload",
    // "user_insight", // 您对本次导航满意吗
    "vip"
    // "weather_restrict_config",
  ];
  if (obj?.data) {
    for (let i of items) {
      if (obj?.data?.[i]) {
        obj.data[i] = { status: 1, version: "", value: "" };
      }
    }
  }
} else if (url.includes("/shield/search/common/coupon/info")) {
  if (obj?.data) {
    obj.data = {};
  }
} else if (url.includes("/shield/search/nearbyrec_smart")) {
  // 附近页面
  const items = ["head", "search_hot_words", "feed_rec"];
  if (obj?.data?.modules?.length > 0) {
    if (obj?.data?.modules?.length > 0) {
      obj.data.modules = obj.data.modules.filter((i) => items?.includes(i));
    }
  }
} else if (url.includes("/shield/search/poi/detail")) {
  // 搜索结果 模块详情
  const items = [
    "CouponBanner", // 高德红包
    // "anchor",
    "adv_compliance_info", // 服务提供方
    "adv_gift",
    // "base_info",
    "bigListBizRec", // 周边景点推荐 三张景点大图
    "bottomDescription", // 底部描述 高德酒店 全网比价
    // "brand_introduction",
    "brand_shop_bar",
    // "brand_story",
    "checkIn",
    "check_in", // 足迹打卡
    "cityCardFeed", // 景点卡片
    // "cityPhoto", // 城市照片
    "city_discount", // 专业老师在线答疑
    "claim", // 立即认领 管理店铺
    "co_branded_card",
    "collector_guide", // 游玩的图文指南
    "common_coupon_bar", // 领券条幅 新客专享 省钱卡
    "common_coupon_card", // 优惠券卡片
    // "companyInfo", // 简介
    "comprehensiveEditEntrance", // 编辑地点信息
    // "consultancy",
    "contributor", // 地点贡献
    // "coupon_allowance",
    // "coupon_entrance",
    "cpt_service_shop", //买卖二手房
    // "craftsman_entry",
    // "crowd_index", // 人流量情况
    "dayTripList", // 热门一日游
    // "detailFeedCommodity",
    // "detail_bottom_shop_service",
    "discount_commodity", // 优惠团购
    "divergentRecommendModule", // 你可能还喜欢
    // "evaluate", // 高德出行评分
    // "events",
    "everyOneToSee", // 大家还在看
    "feedback", // 问题反馈
    "first_surround_estate_tab", // 周边小区
    // "floor_guide_second", // 楼层导览
    // "footer_logo",
    // "foreclosurehouse",
    // "gallery_info", // 现场照片
    // "ggc_entry",
    // "hkfMiniPortal", // 订票页面 飞机 火车 汽车
    "horizontalGoodsShelf",
    "hotPlay", // 热门玩法
    "hot_new_house_estate",
    "hot_shop",
    "hotelCoupon",
    "hotelList", // 热门酒店
    "hotelMustRead", // 订房必读
    // "hotelRooms", // 酒店所有房间
    // "hourHotelRooms", // 钟点房
    "houseList",
    "houseOfficeBrandIntroduction",
    "houseOfficeInfo",
    "houseOfficeNotice",
    "houseOfficeService",
    "house_apart_info",
    "house_buying_agent",
    "house_coupon",
    "house_cp_clues",
    "house_cpt_coupon",
    "house_cpt_grab",
    "house_price",
    "house_rent_sale_agency",
    // "human_traffic", // 人流量情况 有统计图
    "image_banner",
    "legSameIndustryRecEntrance", // 全城最热景点推荐
    "legal_document", // 房源法律信息
    "listBizRec_1",
    "listBizRec_2", // 周边餐饮
    "matrix_banner", // 高德车服
    "merchantSettlement", // 商家店铺管理
    "membership", // 高德菲住卡 会员项目
    "mini_hook_shelf", // 购票迷你模块
    "movie_info", // 优惠购票 景点宣传片
    "multi_page_anchor", // 二级导航菜单 门票 评论 推荐
    // "navbarMore", // 右上角三点
    "nearbyRecommendModule", // 周边推荐
    "nearby_house",
    "nearby_new_house_estate",
    "nearby_office_estate",
    "nearby_old_sell_estate",
    "nearby_play_rec", // 附近玩乐项目
    "newGuest", // 新客专享
    "newRelatedRecommends", // 探索周边
    "new_operation_banner", // 精选活动 高德的推广
    "newsellhouse",
    // "normal_nav_bar", // 右上角图标 客服 反馈
    // "notification",
    "officerenthouse",
    "officesellhouse",
    "official_account", // 其他平台官方账号
    "oldsellhouse",
    // "opentime", // 营业时间
    "operation_banner", // 横版图片推广
    "operator_card",
    "packageShelf", // 附近酒景推荐
    "parentBizRec",
    "parentPoiRecEntrance", // 所在商圈
    "poster_banner",
    // "poi_intercept",
    "portal_entrance", // 高德旅游版块 引流到旅游频道
    // "question_answer_card", // 问问 地点附近的热门问题
    "quickLink", // 地点详情页图标 酒店 景点 热榜
    "relatedRecommends", // 附近同类型酒店
    // "realtorRealStep",
    "renthouse",
    "rentsaleagencyv2",
    "rentsaleagencyv3",
    "rentsalehouse",
    "residentialOwners", // 小区业主
    "reviews", // 用户评价
    // "roomSelect", // 选择订房日期 悬浮菜单
    "sameIndustryRecommendModule",
    "sameIndustry2RecommendModule",
    // "same_price_new_estate",
    "scenic_coupon", // 优惠券过期提示
    "scenic_filter", // 购票悬浮菜单 可定明日 随时退
    // "scenic_guide",
    // "scenic_helper", // 景区助手 开放时间 旺季 淡季
    // "scenic_knowledge",
    "scenic_lifeservices", // 吃住购娱 餐厅 购物
    "scenic_mustplay", // 必游景点 四张景点大图
    // "scenic_parking",
    "scenic_play_guide", // 景区攻略 游玩攻略 交通攻略
    "scenic_recommend", // 景点建议
    // "scenic_route",
    // "scenic_route_intelligent", // 推荐游玩线路
    // "scenic_service",
    // "scenic_ski", // 滑雪攻略 雪道数量 设施及服务
    // "scenic_story",
    // "scenic_ticket", // 购票
    // "scenic_ticket_activity", // 购票活动
    "scenic_voice", // 语音讲解 付费的项目
    "searchPlaMap", // 周边推荐
    "second_surround_estate_tab", // 周边房产
    "service_shop", // 中介门店
    // "shop_news",
    "smallListBizRec", // 周边热门酒店
    "smallOrListBizRec",
    "surroundOldSellHouse", // 同城二手房
    "surroundRentHouse", // 附近租房
    "surround_facility",
    "surround_facility_new",
    "surround_house_tab",
    "surround_oldsellhouse",
    "surround_renthouse",
    "surround_rentoffice",
    "surround_selloffice",
    // "traffic", // 交通出行 地铁站 公交站 停车场
    "travelGuideRec", // 人气景点 路线 购票
    "uploadBar",
    "upload_bar", // 上传照片
    "verification", // 商家已入驻
    // "video",
    "waistRecEntrance", // 更多人气好去处
    "waterFallFeed", // 附近景点瀑布流
    "waterFallFeedTitle" // 更多好去处
  ];
  if (obj?.data?.modules) {
    for (let i of items) {
      delete obj.data.modules[i];
    }
  }
} else if (url.includes("/shield/search_business/process/marketingOperationStructured")) {
  // 详情页 顶部优惠横幅
  if (obj?.data?.tipsOperationLocation) {
    delete obj.data.tipsOperationLocation;
  }
  if (obj?.data?.resourcePlacement) {
    delete obj.data.resourcePlacement;
  }
} else if (url.includes("/shield/search_poi/homepage")) {
  // 首页 搜索框历史记录 推广标签
  if (obj?.history_tags) {
    delete obj.history_tags;
  }
} else if (url.includes("/shield/search_poi/search/sp") || url.includes("/shield/search_poi/mps")) {
  if (obj?.data?.list_data) {
    let list = obj.data.list_data.content[0];
    // 详情页 底部 房产推广
    if (list?.hookInfo) {
      let hookData = list.hookInfo.data;
      if (hookData?.header) {
        delete hookData.header;
      }
      if (hookData?.house_info) {
        delete hookData.house_info;
      }
    }
    // 详情页 底部 订酒店
    if (list?.map_bottom_bar?.hotel) {
      delete list.map_bottom_bar.hotel;
    }
    if (list?.poi?.item_info?.tips_bottombar_button?.hotel) {
      delete list.poi.item_info.tips_bottombar_button.hotel;
    }
    // 地图优惠推广
    if (list?.map?.main_point) {
      delete list.map.main_point;
    }
    if (list?.tips_operation_info) {
      delete list.tips_operation_info;
    }
    if (list?.bottom?.bottombar_button?.hotel) {
      delete list.bottom.bottombar_button.hotel;
    }
    // 搜索页 顶部卡片
    if (list?.card?.card_id === "SearchCardBrand" && list?.item_type === "brandAdCard") {
      delete list.card;
    }
    if (list?.card?.card_id === "NearbyGroupBuy" && list?.item_type === "toplist") {
      delete list.card;
    }
    if (list?.card?.card_id === "ImageBanner" && list?.item_type === "ImageBanner") {
      delete list.card;
    }
  } else if (obj?.data?.district?.poi_list) {
    // 搜索列表详情页
    let poi = obj.data.district.poi_list[0];
    // 订票横幅
    if (poi?.transportation) {
      delete poi.transportation;
    }
    // 景点门票 酒店特惠 特色美食 休闲玩乐
    if (poi?.feed_rec_tab) {
      delete poi.feed_rec_tab;
    }
  } else if (obj?.data?.modules) {
    if (obj?.data?.modules?.not_parse_result?.data?.list_data) {
      let list = obj.data.modules.not_parse_result.data.list_data.content[0];
      // 详情页 底部 房产推广
      if (list?.hookInfo) {
        let hookData = list.hookInfo.data;
        if (hookData?.header) {
          delete hookData.header;
        }
        if (hookData?.house_info) {
          delete hookData.house_info;
        }
      }
      // 详情页 底部 订酒店
      if (list?.map_bottom_bar?.hotel) {
        delete list.map_bottom_bar.hotel;
      }
      if (list?.poi?.item_info?.tips_bottombar_button?.hotel) {
        delete list.poi.item_info.tips_bottombar_button.hotel;
      }
      // 地图优惠推广
      if (list?.map?.main_point) {
        delete list.map.main_point;
      }
      // 左上角动图推广
      if (list?.tips_operation_info) {
        delete list.tips_operation_info;
      }
      if (list?.bottom?.bottombar_button?.hotel) {
        delete list.bottom.bottombar_button.hotel;
      }
    }
    if (obj?.data?.modules?.list_data?.data) {
      // 搜索列表
      let list = obj.data.modules.list_data.data;
      if (list?.content?.length > 0) {
        // brandAdCard广告卡片 toplist_al人气榜单 高德指南
        list.content = list.content.filter((i) => !["brandAdCard", "toplist_al"]?.includes(i?.item_type));
      }
    }
  }
} else if (url.includes("/shield/search_poi/sug")) {
  if (obj?.tip_list) {
    let newLists = [];
    if (obj?.tip_list?.length > 0) {
      for (let item of obj.tip_list) {
        if (
          ["12"]?.includes(item?.tip?.datatype_spec) ||
          ["ad", "poi_ad", "toplist"]?.includes(item?.tip?.result_type) ||
          ["ad", "exct_query_sug_merge_theme", "query_sug_merge_theme", "sp"]?.includes(item?.tip?.task_tag)
        ) {
          continue;
        } else {
          newLists.push(item);
        }
      }
      obj.tip_list = newLists;
    }
  } else if (obj?.city_list) {
    let newLists = [];
    if (obj?.city_list?.length > 0) {
      for (let item of obj.city_list) {
        let newTips = [];
        if (item?.tip_list?.length > 0) {
          for (let ii of item.tip_list) {
            if (["12"]?.includes(ii?.tip?.datatype_spec)) {
              continue;
            } else if (["ad", "poi_ad"]?.includes(ii?.tip?.result_type)) {
              continue;
            } else {
              newTips.push(ii);
            }
          }
          item.tip_list = newTips;
        }
        newLists.push(item);
      }
      obj.city_list = newLists;
    }
  }
} else if (url.includes("/shield/search_poi/tips_operation_location")) {
  // 搜索页面 底部结果上方窄横幅
  if (obj?.data?.coupon) {
    delete obj.data.coupon;
  }
  const items = [
    "belt",
    "common_float_bar",
    "common_image_banner",
    "coupon_discount_float_bar",
    "coupon_float_bar",
    "discount_coupon",
    "image_cover_bar",
    "mood_coupon_banner",
    "operation_brand",
    "promotion_wrap_card",
    "tips_top_banner"
  ];
  if (obj?.data?.modules) {
    for (let i of items) {
      delete obj.data.modules[i];
    }
  }
} else if (url.includes("/valueadded/alimama/splash_screen")) {
  // 开屏广告
  if (obj?.data?.ad?.length > 0) {
    for (let item of obj.data.ad) {
      item.set.setting.display_time = 0;
      item.creative[0].start_time = 3818332800; // Unix 时间戳 2090-12-31 00:00:00
      item.creative[0].end_time = 3818419199; // Unix 时间戳 2090-12-31 23:59:59
    }
  }
}

$done({ body: JSON.stringify(obj) });
