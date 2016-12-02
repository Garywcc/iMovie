var mongoose=require('mongoose');
var detail=require('../schemas/detail');


var Detail=mongoose.model("Detail",detail);

module.exports=Detail