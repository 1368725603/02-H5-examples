// 引入nodeJS服务器核心模块
var http = require('http');
var url1 = require('url');
// 引入代理服务器模块
var httpProxy = require('http-proxy');    
// 创建一个代理服务器对象  
var proxy = httpProxy.createProxyServer({});
// 引入假数据
var virtualDate = require('./data.js');

var server = http.createServer(function (req, res) {
    if (req.url != '/favicon.ico') { // 阻止浏览器默认请求
        var headConfig = { // 配置请求头
            // 中文
            "content-type" : "text/html;charset=utf8",
            // cors跨域资源共享
            // "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,Content-Length,Authorization,Accept,X-Requested-With"
        };
        if (req.headers.origin == "http://10.96.86.54:9202" || req.headers.origin == "http://127.0.0.1:8848") {
            headConfig["Access-Control-Allow-Origin"] = req.headers.origin;
        }
        // 配置请求头
        res.writeHead(200, headConfig);
        console.log(req.url);      
        // 定义路由分发
        switch (req.url) {
            case '/package/permCheck/?permX=package.edit':
                var obj = {
                    status: true
                };
                res.end(JSON.stringify(obj));
            break;
            /* case '/autotest/inter_products/':
                res.end(JSON.stringify(virtualDate));
            break; */
            // 向代理的服务器发送请求
            default:
				// var urls = 'http://10.179.64.159:9201'; // 薛鹏辉
                var urls = 'http://10.96.91.169:9201'; // 房璐
                // var urls = 'http://172.25.112.243:2333'; // 王许兵
                console.log('代理...' + urls );           
                proxy.web(req, res, { target: urls });
            break;
        }  
    }    	 					
}); 

// 设置服务器端口 
server.listen(8002, function () {
    console.log('http://127.0.0.1:8002 服务器配置成功！');
});
