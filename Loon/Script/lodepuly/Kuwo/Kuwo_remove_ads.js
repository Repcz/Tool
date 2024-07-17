// 2024-07-18 02:27:39
const url = $request.url;
const body = $response.body;

if (!body) $done({});

let obj = JSON.parse(body);

const pathRegex = /\/openapi\/v\d\/tingshu\/index\/radio/;
const typesToRemove = ["banner", "stripAdvert"]; // 删除听书页面轮播图和横幅

if (pathRegex.test(url)) {
    function removeParentIfTypeMatches(obj) {
        if (typeof obj === 'object' && obj !== null) {
            for (let key in obj) {
                if (obj[key] && typeof obj[key] === 'object') {
                    if (typesToRemove.includes(obj[key].type)) {
                        delete obj[key];
                    } else {
                        removeParentIfTypeMatches(obj[key]);
                    }
                }
            }
        }
    }

    removeParentIfTypeMatches(obj);
}

$done({ body: JSON.stringify(obj) });
