var mongoose=require('mongoose');

var admin=new mongoose.Schema({
	name:String,
	password:String
},{collection:'admin'});

admin.statics={
	fetch:function(name1,cb){

		var query=this.find({name:name1});
		mongoose.Promise = global.Promise;
		return query.exec(cb)
	}
}


module.exports=admin