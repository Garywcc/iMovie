var mongoose=require('mongoose');
var admin=require('../schemas/admin')
var Admin =mongoose.model('Admin',admin);



module.exports=Admin;