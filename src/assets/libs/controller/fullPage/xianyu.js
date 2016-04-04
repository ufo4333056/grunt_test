define(function(require, exports, module) {
	
   require('jquery.fullPage');
   require('jquery.fullPage-css');
    
    exports.run = function() {
		var timer;
            var flag    = true;
            function lock()
            {
                clearTimeout(timer);
                flag    = false;
                timer    = setTimeout(function()
                {
                    flag= true;
                }, 200);                
            }
 
		$('#dowebok').fullpage({
			'verticalCentered': false,
			'anchors': ['page1', 'page2', 'page3', 'page4', 'page5'],
			'css3': true,
			'slidesColor': ['#000', '#f60', '#fff', '#fff','#717171'],
			'navigation': true,
			'navigationPosition': 'right',
			'navigationTooltips': ['好吃不讲理', '公司介绍', '品牌介绍', '产品介绍','合作模式'],
			'loopBottom'        : true,        // 顶部轮滚
            'loopTop'           : true,        // 顶部轮滚
			
			'afterLoad': function(anchorLink, index){				 
				
			},
			
			'onLeave': function(index, nextIndex, direction){
				   var box    = $("#box");

                   

                    // 底部
                    if ( index===5 && nextIndex===1 )
						
                    {  console.log(nextIndex);
                        box.addClass("bottom");
						
                        return false;
                    }
                    if ( index===5 && nextIndex===4 && box.hasClass("bottom") )
                    {
                        lock();
                        box.removeClass("bottom");
                        return false;
                    }

                    // 返回事件阻塞
                    return flag
			},
			
			afterRender: function(){
				$('#infoMenu').appendTo('body');
				
				$('#githubLink, .twitter-share-button').appendTo('body');
			}

		});

		

    };

    
});