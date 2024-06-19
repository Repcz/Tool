if (typeof $response == "undefined") {
    console.log("invalid response");
    $done({});
    return;
}

let bodyObj = JSON.parse($response.body);
bodyObj.data.properties.water_mark = false;
bodyObj.data.properties.forbidden_right_click = false;


let multi = bodyObj.data.multi;
for (var i = 0; i < multi.length; i ++) {
    multi[i].path = multi[i].original_path;
}

$done({body:JSON.stringify(bodyObj)});
