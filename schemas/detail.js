var mongoose=require('mongoose');

var detail=new mongoose.Schema({
	num:Number,
	movieName:String,
	detailImgSrc:String,
	englishName:String,
	year:Date,
	nation:String,
	distingush:String,
	language:String,
	showTime:Date,
	long:Number,
	director:String,
	mainActor:[String],
	describe:String
},{collection:'detail'});


detail.statics={
	fetchById:function(id,cb){
		var query=this.findOne({num:id});
		mongoose.Promise = global.Promise;  
		query.exec(cb)
	}
}


module.exports=detail