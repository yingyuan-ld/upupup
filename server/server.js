let http = require('http');
let fs = require("fs");
let url = require("url");
let path = require("path");
var cache = require("./cache.js");

let server = http.createServer(function (request, response) {
    let pathname = url.parse(request.url).pathname;
    pathname = pathname=="/"?"/index.html":pathname;
    //------------------------------关于缓存的研究
    cache(request, response, next);    //缓存相关处理
    //---------------------------------------------
    let type = pathname.split('.').pop();
    let contentType = {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
      }
    // 从文件系统中读取请求的文件内容
    function next (){
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                response.writeHead(404, {'Content-Type': 'text/html'});
            }else{          
                response.writeHead(200, {'Content-Type': contentType[type]});    
                response.write(data);
            }
            response.end();
        });
    }
}).listen(81);
// }).listen(81);
console.log('Server running at http://127.0.0.1:81/');