var mongoose=require('mongoose');

var carousel=new mongoose.Schema({
	item:Number,
	imgSrc:String,
	title:String,
	content:String
},{collection:'carousel'});


carousel.statics={
	fetch:function(cb){
		var query=this.find({});
		mongoose.Promise = global.Promise;  
		return query.exec(cb)
	}/*,
	fetchById:function(id,cb){
		return this.find({_id=id}).exec(cb)
	}*/
}

module.exports=carousel