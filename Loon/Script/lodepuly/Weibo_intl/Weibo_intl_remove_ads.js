/*
脚本引用https://raw.githubusercontent.com/Keywos/rule/main/JS/weibous.js
*/
//2023-09-07 23:18:03

let url = $request.url,
  body = $response.body;
if (url.includes("interface/sdk/sdkad.php")) {
  try {
    let x = JSON.parse(body.substring(0, body.length - 2));
    x.show_push_splash_ad = false;
    x.background_delay_display_time = 6e6;
    x.ads = [];
    $done({ body: JSON.stringify(x) + "OK" });
  } catch (error) {}
} else {
  let e = JSON.parse(body);
  if (url.includes("/statuses/")) {
    // 瀑布流
    e.ad = [];
    e.advertises = undefined;
    e.trends = undefined;
    if (e.statuses) {
      e.statuses = e.statuses.filter(
        (item) =>
          !(["广告", "廣告", "热推", "熱推"].includes(item.mblogtypename) || item?.promotion?.type === "ad"
          ));}
  } else if (url.includes("ct=feed&a=trends")) {
    // 趋势页
    if (e.data?.order) {
      e.data.order = ["search_topic"];
    }
  } else if (url.includes("php?a=search_topic")) {
    // 热搜置顶
    if (e.data?.length && e.data[0].type === "searchtop") {
      e.data.shift();
    }
  } else if (url.includes("user_center")) {
    // 我的页面 尊享专属
    if (e?.data?.cards) {
      e.data.cards.forEach((card) => {
        card.items = card.items.filter(
          (item) => !["personal_vip", "personal_wallpaper"].includes(item.type)
        );})}
  } else if (url.includes("a=get_searching_info")) {
    e = {
      data: {
        expiration_time: "8e8",
        cards: [{ tip: "", word: "" }],
      },
      info: "",
      retcode: 0,
    };
  } else if (url.includes("a=icon_center")) {
    if (e.data[0].title === "单色") {
      for (const i of e.data) {
        for (const k of i.card) {
          k.status = 1;
          k.forbidden = 0;
    }}};
  } else if (url.includes("a=open_app&auth")) {
    // 详情横幅
    if (e.data) {
      e.data.uve_ad_scene = "";
      e.data.vip_info.tips = {};
      e.data.vip_title_ad = "";
      e.data.close_ad_setting = {};
      e.data.background_preview = "";
      e.data.detail_banner_ad = [];
    }
  } else if (url.includes("a=get_coopen_ads")) {
    if (e.data) {
      e.data.ad_list = [];
      e.data.gdt_video_ad_ios = [];
      e.data.display_ad = 0;
      e.data.ad_ios_id = null;
      e.data.app_ad_ios_id = null;
      e.data.reserve_ad_ios_id = "";
      e.data.reserve_app_ad_ios_id = "";
      e.data.ad_duration = 6e6;
      e.data.ad_cd_interval = 6e6;
      e.data.pic_ad = [];
    }
  }
  $done({ body: JSON.stringify(e) });
}
