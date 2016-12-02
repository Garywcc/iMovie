var mongodb=require("./db");

function User(user){
	this.name=user.name;
	this.password=user.password;
	this.email=user.email;
};

module.exports=User;


User.prototype.save=function(callback){
	var user={
		name:this.name,
		password:this.password,
		email:this.email
	};

	mongodb.open(function(err,db){
		if(err){
			return callback(err)
		}
		db.collection("users",function(err,collection){
			if(err){
				mongodb.close();
				return callback(err)
			}
			collection.insert(user,{safe:true},function(err,user){    //这里的safe表示，当属性值为true时，使用getLastError命令执行数据的存取操作，该命令返回插入操作的执行结果，默认值为false
				mongodb.close();
				if(err){
					return callback(err)
				}

				callback(null,user);
			});
		});
	});
};


User.get=function(name,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err)
		}
		db.collection("users",function(err,collection){
			if(err){
				mongodb.close();
				return callback(err)
			}
			collection.findOne({name:name},function(err,user){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,user);
			})
		});
	});
}