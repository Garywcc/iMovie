var crypto=require('crypto'),
User=require('../models/user.js');
var mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1/blog');		//在无网的情况下用127.0.0.1
var Carousel=require('../models/carousel');
var List=require('../models/list');
var Admin=require('../models/admin');
var Detail=require('../models/detail')




// mongoose.Promise = require('bluebird');

/*mongoose.connection.once('open',function(){
			var query=Carousel.find();
			 mongoose.Promise = global.Promise;   	// Use native promises.不然会出现Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
			query.exec(function(err,count){
				if(err){console.log(err)}
				//console.log(count);
				carouselTmp=count
				console.log(carouselTmp)
			})
		})
*/
module.exports=function(app){
	app.get('/',function(req,res){
		//分页的页数
		var pages=req.query.pages;
		if(pages <=0){
			pages=1;
		}
		//获取轮播信息
		Carousel.fetch(function(err,carouselList){
			if(err){console.log(err)}
			//获取列表信息
			List.fetch(function(err,list){
				if(err){console.log(err)}
					// console.log(list.length)
					// console.log(list)
				res.render('index',{

					user: req.session.user,
					carouselList:carouselList,
					list:list,
					pages:pages
					
				})
			})
			
		})
				//console.log(count);
				
			
		
	
		//console.log(typeof req.session.user)
		
	});
	//获取具体的内容
	app.get('/content/:id',function(req,res){
		var id=req.params.id.replace(/:/,'');

		
		Detail.fetchById(id,function(err,results){
			if(err){console.log(err)}
				
			res.render('content',{results:results})
		})
	});
	//登陆
	app.get('/login',checkNotLogin)
	app.get('/login',function(req,res){
		res.render('login')
	});
	app.post('/login',checkNotLogin)
	app.post('/login',function(req,res){
		var md5=crypto.createHash('md5'),
		       password=md5.update(req.body.password).digest('hex');
		 User.get(req.body.name,function(err,user){

		 	if(!user){
		 		//req.flash('error','用户不存在');
		 		console.log("用户不存在")
		 		return res.redirect('/login')
		 	}
		 	if(user.password!=password){
		 		//req.flash('error','密码错误');
		 		console.log("密码错误")
		 		return res.redirect('/login')
		 	}
		 	//持久化登陆
		 	//if(req.body.checked){
		 		req.session.user=user;
		 	//}
		 	
		 	
		 	return res.redirect('/')
		 })
	});
	//登出
	app.get('/logout',checkLogin)
	app.get('/logout',function(req,res){
		req.session.user=null;
		res.redirect('/')
	});
	//注册
	app.get('/register',checkNotLogin)
	app.get('/register',function(req,res){
		res.render('register',{
			user:req.session.user
		})
	});
	app.post('/register',checkNotLogin)
	app.post('/register',function(req,res){
		var name=req.body.name;
		var password=req.body.password;
		var password_re=req.body['password-repeat'];
		if(password!=password_re){
			//req.flash('error','两次输入的密码不一致');
			console.log("两次输入的密码不一致")
			return res.redirect('/register');
		}

		var md5=crypto.createHash('md5'),
		       password=md5.update(req.body.password).digest('hex');
		 var newUser=new User({
		 	name:req.body.name,
		 	password:password,
		 	email:req.body.email
		 });

		 User.get(newUser.name,function(err,user){
		 	if(user){
		 		//req.flash('error','用户已存在');
		 		console.log('用户已存在')
		 		return res.redirect('/register')
		 	}

		 	newUser.save(function(err,user){

			 	if(err){
			 		//req.flash('error',err);
			 		return res.redirect('/register');
			 	}
			 	
			 	req.session.user=user.ops[0];
			 	
			 	//req.flash('success','注册成功');
			 	return res.redirect('/')
		 	})

		 });

	});
	//管理员登陆
	app.get('/admin',function(req,res){
		res.render('admin')
	});

	app.post('/admin',function(req,res){
		var name=req.body.adminName;

		/*var md5=crypto.createHash('md5'),
		       password=md5.update(req.body.password).digest('hex');*/
		  //密码的加密问题未解决
		  var password=req.body.password;
		Admin.fetch(name,function(err,results){
			
			if(results[0]!=undefined){

				var fetchPassword=results[0].password;
				if(password!=fetchPassword){
					console.log("密码错误");
					res.redirect("/admin")
				}else{
					
					req.session.admin=results[0];
					res.redirect("admin/adminindex");
				}
			}else{
				console.log("无效的管理员名称")
				res.redirect("/admin")
			}

		})

	});
	//管理员登出
	app.get('/admin/adminLogout',checkAdmin,function(req,res){
		req.session.admin=null;
		res.redirect('/admin')
	})
	//导入信息页
	app.get('/admin/adminindex',checkAdmin,function(req,res){
		res.render('adminindex',{
			admin:req.session.admin
		})
	});
	app.post('/admin/adminindex',function(req,res){
		//列表相关数据
		var addList={
			num:req.body.series,
			movieName:req.body.movieName,
			aHref:'',
			imgSrc:req.body.detailImgSrc,
			aTitle:req.body.movieName,
			aContent:req.body.movieName,
			calendar:req.body.year,
			rating:req.body.rating,
			comment:req.body.ratings_count,
			commentHref:''
		};

		//var mainActorTmp=req.body.mainActor.toString().split(',')
		var mainActorTmp=req.body.director;
		//详细页面信息
		var addDetail={
			num:req.body.num,
			movieName:req.body.movieName,
			detailImgSrc:req.body.detailImgSrc,
			englishName:req.body.englishName,
			year:req.body.year,
			nation:req.body.nation,
			distingush:req.body.distingush,
			language:req.body.language,
			showTime:req.body.showTime,
			long:req.body.long,
			director:req.body.director,
			mainActor:req.body.mainActor,
			describe:req.body.summary
		};
		//存入数据库
		Detail.create([addDetail],function(err){
			if(err){return console.log(err)}
		})
		List.create([addList],function(err){
			if(err){return console.log(err)}
		});
		res.redirect('/admin/adminlist')
	});
	//获取后台数据，展示已存入数据库的数据
	app.get('/admin/adminlist',checkAdmin,function(req,res){
		List.fetch(function(err,list){
			
			res.render('adminlist',{
			list:list,
			admin:req.session.admin
		})
		})
	});
	//删除数据
	app.delete('/admin/adminlist',function(req,res){
		var id=req.query.id;
		
		if(id){
			List.remove({num:id},function(err,result){
				if(err){console.log(err)}
				res.json({success:1});

			})
		}
	})

		
	
}
function checkAdmin(req,res,next){
	if(!req.session.admin){
		return res.redirect('/admin');
	}
	next();
}

function checkLogin(req,res,next){
	if(!req.session.user){
	          return 	res.redirect('/login')    //不加return 会有 Can't set headers after they are sent.错误
	}
	next()
}
function checkNotLogin(req,res,next){
	if(req.session.user){
		return res.redirect('/')
	}
	next()
}