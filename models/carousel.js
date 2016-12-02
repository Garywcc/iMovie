var mongoose=require('mongoose');
var carousel=require('../schemas/carousel')
var Carousel=mongoose.model('Carousel',carousel);

module.exports=Carousel