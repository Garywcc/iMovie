var mongoose=require('mongoose');
var list=require('../schemas/list')
var List=mongoose.model('List',list);

module.exports=List