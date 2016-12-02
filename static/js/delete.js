$(function(){
	$('.delete').click(function(e){

		var target=$(e.target);
		var id=target.data('id');
		var tr=$('.item'+id)[0];
		
		$.ajax({
			type:'DELETE',
			url:'/admin/adminlist?id='+id
		})
		.done(function(results){
			if(results.success==1){
				if(tr!='undefined'){
					tr.remove()
				}
			}
		})
	}) 
})