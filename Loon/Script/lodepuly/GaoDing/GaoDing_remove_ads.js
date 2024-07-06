// 2024-07-06 20:44:51
    var json = JSON.parse($response.body);

    var indicesToDelete = [0, 1, 2];

    indicesToDelete.forEach(function (index) {
        if (json.pits[index]) {
            for (var prop in json.pits[index]) {
                delete json.pits[index][prop];
            }
        }
    });

    $done({ body: JSON.stringify(json) });