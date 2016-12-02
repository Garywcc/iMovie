
var settings=require("./settings")


var express=require('express');
var port=process.env.PORT || 3000;
var app=express();
//session模块
var session=require("express-session");	// 把session 存储在mongodb，需要cookie-parser中间件
var cookieParser = require('cookie-parser');

//express框架提供了针对mongodb的中间件：connect-mongo
var MongoStore=require("connect-mongo")(session);

app.use(cookieParser());    //这个插件通常当作中间件使用，app.use(cookieParser()), 这样就可以处理每一个请求的cookie
app.use(session({
	resave:false,//假设每次登陆，就算会话存在也重新保存一次  
 	 saveUninitialized: true,//强制保存未初始化的会话到存储器 
	secret:settings.cookieSecret,
	key:settings.db,
	cookie:{maxAge:1000*60*60*24*30},
	store:new MongoStore({
		url: 'mongodb://127.0.0.1/blog'
	})
}));




var path=require('path');

// var serveStatic=require('serve-static')

var bodyParser = require('body-parser');	//bodyParser用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理

//var flash=require("connect-flash");       //flash是一个在sesson 中用于存储信息的特定区域。信息写入flash,下一次显示完毕后即被清楚，结合重定向功能




app.set('views','./views');
app.set('view engine','ejs');
// app.use('/',serveStatic('movies'));

app.use(bodyParser.urlencoded({extended: true} ))
app.use(express.static(path.join((__dirname ,'static'))))
// console.log(__dirname)
// app.use('/bower_components', express.static(__dirname + '/bower_components'));
// app.use(app.router)

//app.use(flash());

app.listen(port);
console.log('start on port'+port)


var routes=require('./routes/index')


routes(app)

//index page

/*app.get('/',function(req,res){
	res.render('index',{

	})
})


/*app.get('/',function(req,res){
	res.render('index',{
		title:'首页',
		movies:[{
			title:'机械站警',
			_id:1,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg'
		},{
			title:'机械站警',
			_id:2,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg'
		},{
			title:'机械站警',
			_id:3,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg'
		},{
			title:'机械站警',
			_id:4,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg'
		},{
			title:'机械站警',
			_id:5,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg'
		},{
			title:'机械站警',
			_id:6,
			poster:'http://img31.mtime.cn/mg/2015/03/27/120537.13212993_270X405X4.jpg'
		}]
	})
})*/

//detail page
/*app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title:'详情',
		movie:{
			doctor:'何塞',
			country:'美国',
			title:'机械站警',
			year:2014,
			poster:'http://www.baidu.com',
			language:'英语',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'环境的空间的数据放到手机开发框架是发生口角尽快答复还款时间的粉红色大家看法还是大家看法 恢复健康上帝京东客服还加上快递费你几点看法那就肯定是'
		}
	})
})

//admin page
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'后台页面',
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		}
	})
})

//list page
app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'列表页',
		movie:[{
			_id:1,
			doctor:'何塞',
			country:'美国',
			title:'机械站警',
			year:2014,
			poster:'http://www.baidu.com',
			language:'英语',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'环境的空间的数据放到手机开发框架是发生口角尽快答复还款时间的粉红色大家看法还是大家看法 恢复健康上帝京东客服还加上快递费你几点看法那就肯定是'
		}]
	})
})*/