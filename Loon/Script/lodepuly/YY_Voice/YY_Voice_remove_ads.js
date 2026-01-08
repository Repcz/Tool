// 2024-09-08 12:03:12
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/personalCenter/list")) {
    // 处理Banner轮播模块
    if (obj.data && obj.data.modules) {
        obj.data.modules = obj.data.modules.filter(module => {
            if (module.moduleName === "Banner轮播") {
                console.log("删除Banner轮播模块");
                return false;
            }
            return true;
        });
    }

    // 处理度小满借钱和免流量入口
    if (obj.data && obj.data.modules) {
        obj.data.modules.forEach(module => {
            if (module.entrances) {
                module.entrances = module.entrances.filter(entrance => {
                    if (["度小满借钱", "免流量"].includes(entrance.name)) {
                        console.log(`删除${entrance.name}入口`);
                        return false;
                    }
                    return true;
                });
            }
        });
    }
}

$done({ body: JSON.stringify(obj) });