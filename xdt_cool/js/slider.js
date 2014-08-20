/* =========================================================

// SKD Slider

// Datum: 2013-02-14
// Author: Samir Kumar Das
// Mail: cse.samir@gmail.com
// Web: http://dandywebsolution.com/skdslider

 *  $('#demo').xdtslider({'delay':5000, 'fadeSpeed': 2000});
 *

// ========================================================= */
(function($){
    $.xdtslider = function(container,options){
        // settings
        var config = {
            'delay': 2000,
            'fadeSpeed': 500,
			'showNav':true,
			'autoStart':true,
			'showNextPrev':false,
			'numericNav':false,
			'showPlayButton':false
        };
		
        if ( options ){$.extend(config, options);}
        // variables
       
	    var element=$(container);
		element.find('ul').addClass('slides');
        var slides = element.find('ul.slides li');
		var targetSlide=0;
		config.currentSlide=0;
		config.currentState='pause';
	   
	    $.xdtslider.createNav(element,slides, config);
	    slides.eq(targetSlide).show();
		if (config.autoStart==true){
		   config.currentState='play';	
           config.interval=setTimeout(function() {
                    $.xdtslider.playSlide(element,slides, config);
                }, config.delay); 
		}
    };
	

  $.xdtslider.createNav=function(element,slides,config){
			
			var slideSet ='<ul class="slide-navs">';
			for(i=0;i<slides.length;i++){
			  var slideContent='';
			  if(config.numericNav==true) slideContent=(i+1);
			  if(i==0)
			  slideSet+='<li class="current-slide slide-nav-'+i+'"><a>'+slideContent+'</a></li>';
			  else
			  slideSet+='<li class="slide-nav-'+i+'"><a>'+slideContent+'</a></li>';
			}
			slideSet+='</ul>';
			
			
			
			if (config.showNav==true){
					element.append(slideSet);
					var nav_width=element.find('.slide-navs')[0].offsetWidth;
					nav_width=parseInt((nav_width/2));
					nav_width=(-1)*nav_width;
					element.find('.slide-navs').css('margin-left',nav_width);
					// Slide marker clicked
					element.find('.slide-navs li').click(function(){
						index = element.find('.slide-navs li').index(this);
						targetSlide = index;
						clearTimeout(config.interval);
						$.xdtslider.playSlide(element,slides, config,targetSlide);
						return false;
					});
			}
			
	    if (config.showNextPrev==true){
			 var nextPrevButton ='<a class="prev"></a>'; 
			     nextPrevButton +='<a class="next"></a>'; 
				 
			 element.append(nextPrevButton);
			 
			 element.find('a.prev').click(function(){
												   
						if(config.currentSlide==0)targetSlide = (slides.length-1);
						else targetSlide = (config.currentSlide-1);
				
						clearTimeout(config.interval);
						$.xdtslider.playSlide(element,slides, config,targetSlide);
						return true;
			 });
			
			 element.find('a.next').click(function(){
												   
						if((config.currentSlide+1)==slides.length)targetSlide = 0;
						else targetSlide = (config.currentSlide+1);
						
						clearTimeout(config.interval);
						$.xdtslider.playSlide(element,slides, config,targetSlide);
						return false;
			 });
		}
		
	  if (config.showPlayButton==true){
		   
			var playPause =(config.currentState=='play' || config.autoStart==true)?'<a class="play-control pause"></a>':'<a class="play-control play"></a>';  
		    
			element.append(playPause);
			
			
			element.hover(function(){element.find('a.play-control').css('display','block');},function(){element.find('a.play-control').css('display','none');});
		   
		    element.find('a.play-control').click(function(){
												   
					if(config.currentState=='play')
					{
					   clearTimeout(config.interval);
					   config.currentState='pause';
					   $(this).addClass('play');
					   $(this).removeClass('pause');
					}
					else
					{
					   config.currentState='play';
					   config.autoStart=true;
					   $(this).addClass('pause');
					   $(this).removeClass('play');
					   
					   if((config.currentSlide+1)==slides.length)targetSlide = 0;
					   else targetSlide = (config.currentSlide+1);
					   
					   clearTimeout(config.interval);
					   $.xdtslider.playSlide(element,slides, config,targetSlide);
					}
						
				   return false;
			 });
	  }
	  
  };

 $.xdtslider.playSlide=function(element,slides,config,targetSlide){
	   
	    element.find('.slide-navs li').removeClass('current-slide');	
		slides.eq(config.currentSlide).fadeOut(config.fadeSpeed);
		
		if(typeof (targetSlide)=='undefined'){
	      targetSlide = ( config.currentSlide+1 == slides.length ) ? 0 : config.currentSlide+1;
		}
		
		element.find('.slide-navs li').eq(targetSlide).addClass('current-slide');
	    slides.eq(targetSlide).fadeIn(config.fadeSpeed, function() {													 
			$.xdtslider.removeIEFilter($(this)[0]);
		});
		config.currentSlide=targetSlide;
		
	  if (config.autoStart==true && config.currentState=='play'){
			config.interval=setTimeout((function() {
				$.xdtslider.playSlide(element,slides, config);
			}), config.delay);
	  }
  };
  
  $.xdtslider.removeIEFilter=function(elm){
	  if(elm.style.removeAttribute){
		elm.style.removeAttribute('filter');
	   }  
  }

 $.fn.xdtslider = function(options){
        return this.each(function(){
            (new $.xdtslider(this,options));
        });
    };
	
})(jQuery);