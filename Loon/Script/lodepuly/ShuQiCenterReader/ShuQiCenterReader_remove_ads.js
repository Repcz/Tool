// 2024-07-14 03:31:20
var json = JSON.parse($response.body);

if (json.data && json.data.moduleInfos && Array.isArray(json.data.moduleInfos) && json.data.moduleInfos.length > 1) {
    delete json.data.moduleInfos[1];
}

if (json.data && json.data.props && json.data.props["x-dependencies"] && Array.isArray(json.data.props["x-dependencies"])) {
    delete json.data.props["x-dependencies"][0];
}

$done({ body: JSON.stringify(json) });