// 引入nodeJS服务器核心模块
var http = require('http');
var url1 = require('url'); // 请求方式为get, 获取参数
// 引入代理服务器模块
var httpProxy = require('http-proxy');
// 创建一个代理服务器对象  
var proxy = httpProxy.createProxyServer({});
//获取本机ip
const os = require('os');
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
const myHost = getIPAdress();
// console.log('myHost: ', myHost);
// 引入假数据
var virtualDate = require('./data.js');

var server = http.createServer(function(req, res) {
  if (req.url != '/favicon.ico') { // 阻止浏览器默认请求
    var headConfig = { // 配置请求头
      // 中文
      "content-type": "text/html;charset=utf8",
      // cors跨域资源共享
      // "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Content-Length,Authorization,Accept,X-Requested-With"
    };
    if (
      req.headers.origin == "http://" + myHost + ":9202" ||
      req.headers.origin == "http://127.0.0.1:9202" ||
      req.headers.origin == "http://localhost:9202"
    ) {
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
        /* 
        case '/autotest/inter_products/':
          res.end(JSON.stringify(virtualDate));
          break;
        */
        // 向代理的服务器发送请求
      default:
        // var urls = 'http://10.96.115.67:9201'; // 房璐
        // var urls = 'http://10.96.84.207:9201'; // 刘江龙
        // var urls = 'http://172.25.154.101:8071'; // 易品
        // var urls = 'http://10.96.86.54:8888/'; // 焦淑鹏
        var urls = 'http://10.96.86.54:9201/';
        console.log('代理...' + urls);
        proxy.web(req, res, {
          target: urls
        });
        break;
    }
  }
});

// 设置服务器端口 
server.listen(8002, function() {
  console.log('http://' + myHost + ':8002 服务器配置成功！');
});
