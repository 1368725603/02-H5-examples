var express = require("express");
var app = express();

// 设置跨域请求头
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// get请求
app.get('/get', function (req, res) {
    var query = req.query;
    console.log('query_get: ', query);
    res.json(obj);
});
// jsonp请求
app.get('/jsonp', function (req, res) {
    var query = req.query;
    console.log('query_jsonp: ', query);
    if (query.callback) {
        res.send(query.callback + '(' + JSON.stringify(obj) + ')'); // 返回函数调用
    } else {
        res.json({});
    }
});

// 监听端口
app.listen(8888, function () {
    console.log("服务器配置成功: http://127.0.0.1:8888");
});

var obj = {
    error: 0,
    msg: 'success',
    data: [
        {a: 1, b: 2, c: 3},
        {a1: 4, b1: 5, c1: 6},
        {a2: 7, b2: 8, c2: 9},
    ]
}