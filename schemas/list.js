var mongoose=require('mongoose');

var list=new mongoose.Schema({
	num:Number,
	movieName:String,
	aHref:String,
	imgSrc:String,
	aTitle:String,
	aContent:String,
	calendar:String,
	rating:Number,
	comment:Number,
	commentHref:String
},{collection:'list'});


list.statics={
	fetch:function(cb){
		var query=this.find({});
		mongoose.Promise = global.Promise;  
		return query.exec(cb)
	}
	/*fetchById:function(id,cb){
		return this.find({_id=id}).exec(cb)
	}
	add:function(obj,cb){

	}*/
}

module.exports=list