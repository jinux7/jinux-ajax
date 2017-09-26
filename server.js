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
//home页路由
app.get('/api', function (req, res) {
  /*res.send({
    error_code : 3001,
    error_msg : "测试报错信息接口！！！"
  });*/
        console.log(req);
        res.send('abcdefg');    
   
    
});
app.post('/api',function(req,res){
    console.log(req);
    setTimeout(function(){
        res.send({
            name: '小明'
        });    
    },0);
});
/*app.post('/upload',function(req,res){
        var form = new formidable.IncomingForm();
        form.uploadDir = __dirname+"/../public/pictures";
        form.keepExtensions = true;
        form.parse(req, function(err, fields, files,next){
                console.log(fields);
                //console.log(fields);
                res.send('ok');
        });
});*/
app.post('/upload', function(req, res) {
    var form = new multiparty.Form();
   
    form.parse(req, function(err, fields, files) {
      console.log(fields);
      console.log(files);
      
      res.send('ok');
    });
 
});

app.listen(app.get('port'), function () {
    console.log( '服务器启动完成，端口为： '+app.get('port') );
});