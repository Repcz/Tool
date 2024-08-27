// 2024-07-16 17:20:13
let obj = JSON.parse($response.body);

// 定义要删除的路径
const pathsToDelete = [
    "result.homead", // 首页广告
    "result.h5_promotion_page", // 推广页面
    "result.advert_interval", // 广告间隔配置
    "result.abtest_h5url", // 二手车信息流
    "result.launchApp", // 动车帝信息流
    "result.goucheConfig", // 购车页面配置
    "result.gouche", // 购车页面
    "result.mainLiveConfig", // 直播页面配置
    "result.discover", // 发现
    "result.adSdkSwitch4testPointVideo", // 广告SDK视频
    "result.adSdkSwitch4simulationExam", // 广告SDK视频
    "result.examPageLoadADSwitch" // 考试页面加载广告切换
];

// 遍历并删除指定路径
pathsToDelete.forEach(path => {
    const parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length; i++) {
        if (i === parts.length - 1) {
            delete current[parts[i]];
        } else {
            current = current[parts[i]];
            if (!current) break;
        }
    }
});

$done({ body: JSON.stringify(obj) });