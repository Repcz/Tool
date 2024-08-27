// 2024-07-26 23:11:46

const url = $request.url;
let header = $request.headers;
let obj = JSON.parse($response.body);
if (url.includes("/api.caiyunapp.com/v1/activity")) {
  if (url.includes("&type_id=A03&")) {
    // 底栏控制项目 主页图标 天气助手 彩云ai
    if (obj?.interval) {
      obj.interval = 2592000; // 30天===2592000秒
    }
    if (obj?.activities?.length > 0) {
      for (let item of obj.activities) {
        if (item?.name && item?.type && item?.feature) {
          item.feature = false;
        }
      }
    }
  } else {
    // 其他请求
    obj = {
      status: "ok",
      interval: 2592000,
      id: "1",
      activities: [
        {
          items: [{ text: "", image_light: "", link: "", activity_name: "", id: "1", image_dark: "" }],
          type: "activity_icon",
          name: "",
          carousel: "5000"
        }
      ]
    };
  }
} else if (url.includes("/wrapper.cyapi.cn/v1/activity")) {
  // 彩云推广
  if (["&type_id=A03&"]?.includes(url)) {
    // 天气助手 彩云ai
    if (obj?.interval) {
      obj.interval = 2592000; // 30天===2592000秒
    }
    if (obj?.activities?.length > 0) {
      obj.activities = [];
    }
  } else {
    // 其他请求
    obj = {
      status: "ok",
      interval: 2592000,
      id: "1",
      activities: [
        {
          items: [{ text: "", image_light: "", link: "", activity_name: "", id: "1", image_dark: "" }],
          type: "activity_icon",
          name: "",
          carousel: "5000"
        }
      ]
    };
  }
}
$done({ body: JSON.stringify(obj) });