// 2024-07-06 20:44:51
if ($request.url.includes('/exhibitions/template/resources')) {
    var json = JSON.parse($response.body);

    var indicesToDelete = [0, 1];

    indicesToDelete.forEach(function (index) {
        if (json.pits[index]) {
            for (var prop in json.pits[index]) {
                delete json.pits[index][prop];
            }
        }
    });

    $done({ body: JSON.stringify(json) });
} else if ($request.url.includes('/exhibitions/app_mine/resources')) {
    var json = JSON.parse($response.body);

    if (json.finance_tab) {
        delete json.finance_tab;
    }
    $done({ body: JSON.stringify(json) });
} else {
    $done({});
}