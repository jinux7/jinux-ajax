var express = require('express');
var app = express();
var formidable = require('formidable');
var multiparty = require('multiparty');
var bodyParser = require('body-parser');

app.set('port',process.env.PORT || 3000);   //设置端口

/*app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200); //让options请求快速返回
    else  next();
});*/

//使用static中间件 制定public目录为静态资源目录,其中资源不会经过任何处理
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/get', function (req, res) {
        var data = {
            info: req.query.info,
            hostName: req.hostname
        };
        res.send(data);    
   
    
});

app.post('/post_form',function(req,res){
        var data = {
            name: req.body.name,
            info: req.body.info,
            hostName: req.hostname
        };
        res.send(data);  
});

app.post('/post_json',function(req,res){
        var data = {
            name: req.body.name,
            info: req.body.info,
            hostName: req.hostname
        };
        res.send(data);   
});


//上传文件，也就是 contentType: 'multipart/form-data' 接口
app.post('/upload', function(req, res) {
    var form = new multiparty.Form();
    form.encoding = 'utf-8';
    form.uploadDir = __dirname+'/uploadFiles';
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        res.send('ok');
    });
 
});

app.listen(app.get('port'), function () {
    console.log( '服务器启动完成，端口为： '+app.get('port') );
});