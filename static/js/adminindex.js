$(function(){ 
                    //获取豆瓣数据
                   $("#douban").click(function(){
                    var  series=$("#series").val();
                     
                        $.ajax({
                            url:"https://api.douban.com/v2/movie/subject/"+series,
                            type:"get",
                            dataType:"jsonp",
                            jsonp:"callback",
                            cache:true,
                            crossDomain:true,
                            success:function(data){
                                dealData(data)
                                console.log(data)
                               
                            },
                            error:function(err){
                                console.log(err)
                            }
                        })
                    });
                });
                
                
                //处理数据的函数
                function dealData(data){
                    $("#num").val(data.id);
                    $("#movieName").val(data.title);
                    $("#detailImgSrc").val(data.images.large);
                    $("#englishName").val(data.aka.join(''));
                    $("#year").val(data.year);
                    $("#nation").val(data.countries.join(','));
                    $("#distingush").val(data.genres.join('/'));
                    $("#language").val('');
                    $("#showTime").val(data.year);
                    $("#long").val('');
                    $("#director").val(data.directors[0].name);
                    $("#mainActor").val(data.casts[0].name);
                    $("#summary").val(data.summary);
                    $("#rating").val(data.rating.average);
                    $("#ratings_count").val(data.ratings_count);
                }
      