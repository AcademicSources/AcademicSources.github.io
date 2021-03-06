document.ontouchmove = function ( event ) {
	var isTouchMoveAllowed = true, target = event.target;
	while ( target !== null ) {
		if ( target.classList && target.classList.contains( 'headerMain-navMainClose' ) ) {
			isTouchMoveAllowed = false;
			break;
		}
		target = target.parentNode;
	}
	if ( !isTouchMoveAllowed ) {
		event.preventDefault();
	}
};

function removeIOSRubberEffect( element ) {
	element.addEventListener( "touchstart", function () {
		var top = element.scrollTop, totalScroll = element.scrollHeight, currentScroll = top + element.offsetHeight;
		if ( top === 0 ) {
			element.scrollTop = 1;
		} else if ( currentScroll === totalScroll ) {
			element.scrollTop = top - 1;
		}
	} );
}
$(document).ready( function() {
	//if selector not null
	if (document.querySelector( ".headerMain-navMain ul" ) != null)
			removeIOSRubberEffect( document.querySelector( ".headerMain-navMain ul" ) );

});
//Inline label pattern. Respectfully stolen and modified from http://codepen.io/anon/pen/GHKJj
$(document).ready( function() {
	
var placeholderSupport = Modernizr.input.placeholder;
var requiredSupport = Modernizr.input.required;

$(function () 
{
  var onClass = "on";
  var showClass = "show";
  
  $(".inlineLabel label, .inlineLabel .labelItems").each(function () {
    //make a variable for this label
    el = $(this);
	inputs = el.next('input, select, textarea');
    //get the value of the label
    label_value = el.html();
    //target the next sibling input and
    //fill it with the label's value
    el.next('input, textarea').attr("placeholder",label_value);
    //target the next sibling select, append an
	//option element and give it the selected attribute
    //el.next('select').prepend("<option value=''>" + label_value +  "</option>").val('');
	if (requiredSupport == false) {
		el.next('input, select, textarea').addClass("required");
	}
	if (placeholderSupport == false) {
		$('[placeholder]').focus(function() {
			var input = $(this);
			  if (input.val() == input.attr('placeholder')) {
				  input.val('');
				   input.removeClass('placeholder');
			  }
			}).blur(function() {
			   var input = $(this);
			   if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			   }
			}).blur();
			
			$('[placeholder]').parents('form').submit(function() {
			  $(this).find('[placeholder]').each(function() {
			  var input = $(this);
			  if (input.val() == input.attr('placeholder')) {
				input.val('');
			  }
			})
		});
	}
});

  $(".inlineLabel input, .inlineLabel select, .inlineLabel textarea")
    .bind("checkval", function () 
    {
      var label = $(this).prev("label, .labelItems");
        
		if ($(this).prop('tagName') == "SELECT")
		{
			// do this for select
			var selected = $(this).val();
			var firstItem = $(this)[0].children[0].value;
			if (selected != firstItem)
				label.addClass(showClass);
			else
				label.removeClass(showClass);
		}
		else
		{
			// do this for input
		  if (this.value !== "" && !$(this).hasClass("placeholder"))
			label.addClass(showClass);
			
		  else
			label.removeClass(showClass);
		}
		
    })
    .on("keyup", function () 
    {
      $(this).trigger("checkval");
    })
    .on("focus", function () 
    {
      $(this).prev("label").addClass(onClass);
    })
    .on("blur", function () 
    {
        $(this).prev("label").removeClass(onClass);
    })
    .trigger("checkval");
    
  $(".inlineLabel select")
    .on("change", function ()
    {
      var $this = $(this);
      
			var selected = $(this).val();
			var firstItem = $(this)[0].children[0].value;
			if (selected != firstItem)
				$this.removeClass("watermark");
			else
				$this.addClass("watermark");
        
      $this.trigger("checkval");
    })
    //.change();
	$(this).trigger("checkval");
});});



/*Small hack to fix secondary nav. As of now, the class "selected" gets added not only to direct parent LI of the current page link, but
also to the parent of that UL if it is a second or third level link. This adds the class of lastSelected to the actual current page LI*/
$(document).ready( function() {
	$(".navSecondary ul li.selected:last").addClass("lastSelected");
});

/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/
// Creates doubletap behavior on touchscreens for dropdown navigation where the parent is an active link
// http://osvaldas.info/drop-down-navigation-responsive-and-touch-friendly 
;(function(e,t,n,r){e.fn.doubleTapToGo=function(r){if(!("ontouchstart"in t)&&!navigator.msMaxTouchPoints&&!navigator.userAgent.toLowerCase().match(/windows phone os 7/i))return false;this.each(function(){var t=false;e(this).on("click",function(n){var r=e(this);if(r[0]!=t[0]){n.preventDefault();t=r}});e(n).on("click touchstart MSPointerDown",function(n){var r=true,i=e(n.target).parents();for(var s=0;s<i.length;s++)if(i[s]==t[0])r=false;if(r)t=false})});return this}})(jQuery,window,document);

//main nav
// on mobile, append the secondary menu items to the main nav
(function( $ ){
   $.fn.mergeMenus = function() {
		waitForFinalEvent(
			function()
			{
				if (window.matchMedia("(max-width: 1023px)").matches)
				{
					$('.headerMain-navSecondary>ul>li').detach().appendTo('.headerMain-navMain > ul').addClass('merged');
					if ($('.headerMain-navMain ul').children('li.mobileHomeLink').length == 0) {
						$('.headerMain-navMain > ul').prepend('<li class="mobileHomeLink"><a href="">Home</a></li>');
					}
				}
				else
				{
					if ($('.headerMain-navSecondary ul').length == 0) {
						//alert('not there');
						$('.headerMain-navSecondary').append('<ul></ul>');
					}
					$('.headerMain-navMain ul').children('li.merged').appendTo('.headerMain-navSecondary ul').removeClass('merged');
					$('.headerMain-navMain ul').children('li.mobileHomeLink').remove();
				}
		}, 0, "mergedMenuResize");
};
})( jQuery );
$(window).bind('load resize orientationchange', $.fn.mergeMenus);

//main nav
// on mobile, append the toggle link to .hasChildren list items
(function( $ ){
   $.fn.subToggles = function() {
		waitForFinalEvent(
			function()
			{
				if (window.matchMedia("(max-width: 1023px)").matches)
				{
					if ($('.headerMain-navMain li').children('.headerMain-navMain-subToggle').length == 0) {
						$('.headerMain-navMain .hasChildren').prepend('<button class="headerMain-navMain-subToggle"></button>');
							$('.headerMain-navMain-subToggle').click(function(event){
								event.preventDefault();
								
								if (!$(this).closest('li').hasClass('is-active')) {
									$('.headerMain-navMain li.is-active').removeClass('is-active');
									$(this).closest('li').addClass('is-active');
								}
								else {
									$('.headerMain-navMain li.is-active').removeClass('is-active');
								}
							});
					}
				}
				else
				{
					$('.headerMain-navMain-subToggle').remove();
				}
		}, 0, "subTogglesResize");
};
})( jQuery );
$(window).bind('load resize orientationchange', $.fn.subToggles);


//Add the pagemask div for all the drawers
$(document).ready( function() {
	$('body').append($("<div></div>").addClass('pageMask'));
});	
//Hook up the main nav show/hide functionality
$(document).ready( function() {
	
	function closeMenu() {
		$('body').removeClass('nav-open');
		$('html').removeClass('nav-open');
	}
	
	function toggleMenu() {
		$('body').toggleClass('nav-open');
		$('html').toggleClass('nav-open');
		$('body').removeClass('search-open');
	}
	
	$('.headerMain-navMainToggle').click(function(event){
		event.preventDefault();
		toggleMenu();
	});
	
	$('.pageMask').click(function(event){
		event.preventDefault();
		closeMenu();
	});
	
	$('.headerMain-navMainClose').click(function(event){
		event.preventDefault();
		closeMenu();
	});
});
//Hook up the search show/hide functionality
$(document).ready( function() {
	function closeSearch() {
		$('body').removeClass('search-open');
	}
	
	function toggleSearch() {
		$('body').toggleClass('search-open');
	}
	
	$('.headerMain-searchMainToggle').click(function(event){
		event.preventDefault();
		toggleSearch();
		$("#mainSearch").focus();
	});
});

//hook up the search filter show/hide functionality
/*
$(document).ready(function() {
        $('.results-filterToggle').on('click', function(e) {
            e.preventDefault();
			$('body').addClass('filterPanel-open');
			return false;
        });
		$('.filterClose').on('click', function(e) {
            e.preventDefault();
			$('body').removeClass('filterPanel-open');
			return false;
        });
});
*/
(function( $ ){
   $.fn.filterToggle = function() {
		waitForFinalEvent(
			function()
			{
				if (window.matchMedia("(max-width: 1023px)").matches)
				{
					function closeFilters() {
						$('body').removeClass('filterPanel-open');
					}
					
					function openFilters() {
						$('body').addClass('filterPanel-open');
					}
					
					$('.results-filterToggle').click(function(){
						openFilters();
					});
					
					$('.filterPanel-close').click(function(){
						closeFilters();
					});
					
					$('.pageMask').click(function(){
						closeFilters();
					});
					
				}
				else
				{
					$('body').removeClass('filterPanel-open');
				}
		}, 0, "filterToggleResize");
};
})( jQuery );
$(window).bind('load resize orientationchange', $.fn.filterToggle);



//add .is-active class to container of main search on input focus
$(document).ready(function() {
	$('#mainSearch').focus(function(e) {
			$(this).closest('.headerMain-search').addClass('is-active');
			e.stopPropagation();
	   }).blur(function(e){
			$(this).closest('.headerMain-search').removeClass("is-active");
			e.stopPropagation();
	});
});

//Truncate long lists and add toggle link to show hide the hidden ones
function truncateList(maxShown, linkTextShow, linkTextHide)
{
	// set default to show
	if (!maxShown)
		maxShown = 5;
	
	// set defaults for link texts
	if (!linkTextShow)
		linkTextShow = "View More";
	if (!linkTextHide)
		linkTextHide = "View Less";
	
	$('ul.truncated').each(
		function() {
			if ($(this).children('li').length > maxShown)
			{
				// hide anything after the maxShown item
				$(this).find("li:gt(" + (maxShown-1) + ")").addClass("is-hidden");
				// add the View more link
				var numMore = $(this).find("li:gt(" + (maxShown-1) + ")").length;
				$(this).append("<li class='truncateToggle'><a href=\"javascript:void(0)\">" + linkTextShow + " (" + numMore + ")</a></li>");
				// wire up link click event
				$(this).find('.truncateToggle a').click(function(e){
					e.preventDefault();
					if ($(this).closest('ul').find('li.is-hidden').length > 0)
					{
						// show items
						$(this).closest('ul').find("li:gt(" + (maxShown-1) + ")").not('.truncateToggle').removeClass('is-hidden');
						$(this).html(linkTextHide);
						$(this).closest('li').addClass('is-active');
					}
					else
					{
						// hide items
						var numMore = $(this).closest('ul').find("li:gt(" + (maxShown-1) + ")").not('.truncateToggle').length;
						$(this).closest('ul').find("li:gt(" + (maxShown-1) + ")").not('.truncateToggle').addClass('is-hidden');
						$(this).html(linkTextShow + " (" + numMore + ")");
						$(this).closest('li').removeClass('is-active');
					}
				});
			}
		}
	);
}



//Read the responsive "state" of the page
//Based on http://demosthenes.info/blog/948/Triggering-JavaScript-Actions-With-CSS-Media-Queries
/*
(function( $ ){
	
$.fn.responsiveState = function() {
	var re = new RegExp('\"', 'g');
		var state = window.getComputedStyle(document.body,':before').content.replace(re, '');
		
		this.lastState = this.lastState || "";
		
		if (this.lastState != "")
		{
			$('body').removeClass(lastState);
		}
		$('body').addClass(state);
		
		this.lastState = state;	
	}
	
})( jQuery );

$(window).bind('load resize orientationchange', $.fn.responsiveState);
*/

//Remove toggle functionality on menus in footer on larger screens
//(function( $ ){
//   $.fn.removeFooterToggles = function() {
//	var $body = $('body');
//		waitForFinalEvent(
//			function()
//			{
//				if ($body.hasClass('med') || $body.hasClass('lg') || $body.hasClass('xlg') || $body.hasClass('xxlg'))
//				{
//					$('.footerMain-dropNav').removeClass('is-hidden');
//					$('.footerMain-navHeader.toggleLink').unbind("click");
//				}
//				else
//				{
//					$('.footerMain-navHeader.toggleLink').click(
//						function() { targetClickShowHide(this);});
//				}
//		}, 0, "removeFooterTogglesResize");
//};
//})( jQuery );
//$(window).bind('load resize orientationchange', $.fn.removeFooterToggles);


//custom flyouts
 function DropDown(el) {
	   this.dd = el;
	   this.placeholder = this.dd.children('span');
	   this.opts = this.dd.find('ul.flyout-content > li');
	   this.val = '';
	   this.index = -1;
	   this.initEvents();
 }
 DropDown.prototype = {
	   initEvents : function() {
			  var obj = this;

			  obj.dd.on('click', function (event)
			  {
				  var alreadyHas = $(this).hasClass('is-open');
				  $('.flyout').removeClass('is-open');
				  if (!alreadyHas) {
					  $(this).toggleClass('is-open');
					 return false;
				  }
			  });

				if (obj.dd.hasClass('flyout--select'))
				{
				  obj.opts.on('click',function(){
						 var opt = $(this);
						 obj.val = opt.text();
						 obj.index = opt.index();
						 obj.placeholder.text(obj.val);
				  });
				}
	   },
	   getValue : function() {
			  return this.val;
	   },
	   getIndex : function() {
			  return this.index;
	   }
 }

 $(function() {

	 $('.flyout').each(
function () {
	var dd = new DropDown($(this));
		 });

	   $(document).click(function() {
			  // all dropdowns
		   $('.flyout').removeClass('is-open');
	   });

 });
 
 var suspendDocumentClickHandler = false;
 
 /*search filter*/
 function DropSearchFilter(el) {
	   this.filter = el;
	   this.selected = this.filter.children('span');
	   this.filterItems = this.filter.find('ul.searchBar-filter-content > li');
	   this.val = '';
	   this.index = -1;
	   this.initEvents();
 }
 DropSearchFilter.prototype = {
	   initEvents : function() {
			  var obj = this;

			  obj.filter.on('click', function (event)
			  {
				  var alreadyHas = $(this).hasClass('is-open');
				  $('.searchBar-filter').removeClass('is-open');
				  if (!alreadyHas) {
					  $(this).toggleClass('is-open');
				  }
				  event.stopPropagation();
			  });
				  obj.filterItems.on('click',function(){
						 var item = $(this);
						 obj.val = item.text();
						 obj.index = item.index();
						 obj.selected.text(obj.val);
						 obj.selected.text('Search: ' + obj.val);
						 //$(".searchBar-input").focus();
				  });

	   },
	   getValue : function() {
			  return this.val;
	   },
	   getIndex : function() {
			  return this.index;
	   }
 }

 $(function() {

	 $('.searchBar-filter').each(
function () {
	var filter = new DropSearchFilter($(this));
		 });
	   $(document).click(function() {
		   	$('.searchBar-filter').removeClass('is-open');
	   });
	   $('.searchBar-filter-content').click(function(e) {
		   	e.stopPropagation();
	   });
	   $('.searchBar-input').focus(function(e) {
			$(this).closest('.searchBar').addClass('is-active');
			e.stopPropagation();
	   }).blur(function(e){
			$(this).closest('.searchBar').removeClass("is-active");
			e.stopPropagation();
	  }).click(function(e){ 
	  	e.stopPropagation();
		}).keyup( function(e) { $('.searchBar-filter.is-open').removeClass('is-open'); } );
	  
 });


// fix for ios bug. If you remove, ios will not activate radios and checkboxes when you click the label.
$('label').click(function() {});
//globally show and hide elements on click
//USAGE: <a href="" class="hiddenTriggerClick">show stuff when this is clicked</a><div class="hiddenContent>I will show when that link over there is clicked</div>
$(document).ready(function() {
    $(".toggleLink").click(function(event) {
		targetClickShowHide(this);
		event.preventDefault();
        });
    })
//globally show and hide elements on hover. We change the hover to click on touchscreen devices
//USAGE: <a href="" class="hiddenTriggerHover">show stuff when this is hovered over</a><div class="hiddenContent>I will show when that link over there is hovered over</div>
$(document).ready(function () {
    //see if we are dealing with a touchscreen device
    if ("ontouchstart" in document.documentElement) {
        //if so, show .hiddenContent on click
        $('.toggleLink--hover').click(function (event) {
			targetClickShowHide(this);
			event.preventDefault();
        });
    } else {
        //if not a touchscreen, show .hiddenContent on hover
        $('.toggleLink--hover').hover(function () {
			targetClickShowHide(this);
        });
    }
});
function targetClickShowHide(sender)
{
	
	function nextInDOM(_selector, _subject) {
		var next = getNext(_subject);
		while(next.length != 0) {
			var found = searchFor(_selector, next);
			if(found != null) return found;
			next = getNext(next);
		}
		return null;
	}
	function getNext(_subject) {
		if(_subject.next().length > 0) return _subject.next();
		return getNext(_subject.parent());
	}
	function searchFor(_selector, _subject) {
		if(_subject.is(_selector)) return _subject;
		else {
			var found = null;
			_subject.children().each(function() {
				found = searchFor(_selector, $(this));
				if(found != null) return false;
			});
			return found;
		}
		return null; 
	}	
	$(sender).toggleClass("is-active");
	var hiddenElement = nextInDOM('.toggleLinkTarget', $(sender));
	if (hiddenElement.length > 0)
		$(hiddenElement[0]).toggleClass('is-hidden');
		$(hiddenElement[0])[0].offsetWidth;
}
// Responsive tabs/accordion. Basically just adds class .active to first tab on load and then any tab clicked on. you show and hide the proceeding content through the css
// Responsive behavior is in the CSS
$(document).ready(function() {
    //loop through all instances of tabs on the page and add "active" to the first one
    $('.tabs').each(function() {
        $(this).children('li').first().children('a').addClass('active');
    });
    //toggle the "active" class on the links with click
    $('.tabs > li > a').click(function() {
        if (!$(this).hasClass('active')) {
            $(this).closest('.tabs').find('a.active').removeClass('active');
            $(this).addClass('active');
            /*In the css, the li's have display:block set on them for mobile view, which is changed to display:inline on larger screens. So we check if the li has display:block, and if so, scroll the page so the open item is at the top of the viewscreen so it is easier to read and the accordion doesnt jump around like a weirdo.*/
            if ($(this).parent('li').css('display') == 'block') {
                $('html, body').animate({
                    scrollTop: $(this).offset().top - 50
                }, 500);
                return false;
            }
        } else {
            if ($('.tabs > li').css('display') == 'block') {
                $(this).closest('.tabs').find('a.active').removeClass('active');
            }
        }
    });
});
//scroll effect to any internal anchor links to give visual feedback of where users are in the document and that they have not been taken to another page

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
/*
$(document).ready(function() {
    $('a[href*=#]').click(function(e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			e.preventDefault();
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                if ($(".style-nav").length)
                {
                    targetOffset = targetOffset - $(".style-nav").outerHeight(true);
                }
                $('html,body').animate({
                    scrollTop: targetOffset
                }, 500);
                iosScrollTopBugFix(500);
                return false;
            }
        }
    });
});*/

//remove right spacing margin on icons if there is no text following it
$(document).ready(function() {
	var singleIcon = 1;
	$("[class*='icon-']").each(function(){
		if ($(this).clone().children().remove().end().text().trim().length <= 0)
			$(this).addClass("icon--empty");
	});
});

//self-closing alerts
$(document).ready(function() {
	$(".alert--closeable").append("<a href=\"javascript:void(0)\" class=\"alert-close\"></a>");
	$(".alert-close").click(function() {
		$(this).closest('.alert--closeable').remove();
	});
});
//self-closing labels
$(document).ready(function() {
	$(".label--closeable").click(function() {
		$(this).remove();
	});
});

//polyfill form field placeholder text for browsers that don't support it
$(document).ready(function() {
    if (!Modernizr.input.placeholder) {
        if (!("placeholder" in document.createElement("input"))) {
            $("input[placeholder], textarea[placeholder]").each(function() {
                var val = $(this).attr("placeholder");
                if (this.value == "") {
                    this.value = val;
                }
                $(this).focus(function() {
                    if (this.value == val) {
                        this.value = "";
                    }
                }).blur(function() {
                    if ($.trim(this.value) == "") {
                        this.value = val;
                    }
                })
            });

            // Clear default placeholder values on form submit
            $('form').submit(function() {
                $(this).find("input[placeholder], textarea[placeholder]").each(function() {
                    if (this.value == $(this).attr("placeholder")) {
                        this.value = "";
                    }
                });
            });
        }
    }
});
/* Fix for ios not rendering the placeholder element on orientation change ( http://mooki83.tistory.com ) */
$(document).ready(function() {
    function fm_optimizeInput() {
        $("input[placeholder],textarea[placeholder]").each(function() {
            var tmpText = $(this).attr("placeholder");
            if (tmpText != "") {
                $(this).attr("placeholder", "").attr("placeholder", tmpText);
            }
        })
    }
    $(window).bind("orientationchange.fm_optimizeInput", fm_optimizeInput);
});

//Dynamically assign negative bottom margin so footer snaps to bottom if page contents don't fill up entire viewport
//footer MUST have position:relative applied in the CSS for this to work
$(document).ready(function() {
    function snapFooter() {
    $(".footer-main").css("");
    var bodyHeight = $("body").height();
    var vwptHeight = $(window).height();
        if (vwptHeight > bodyHeight) {
			//add the heights of all top-level elements in the page that occur before the footer. header, content-wrapper, etc...
            var newHeight = $("html").height() - $(".page-container").outerHeight(true);
            $(".footer-main").css("bottom", -newHeight + "px");
        }
    }
    $(window).load(snapFooter);
    $(window).bind('scroll resize click', snapFooter);
});

// utility function to allow for the waiting of multi fired events to finish before executing
var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

//modals
//http://dimsemenov.com/plugins/magnific-popup/documentation.html
// Magnific Popup v0.9.9 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=inline+image+ajax+iframe+gallery
(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w,x=function(a,b){n.ev.on(i+a+j,b)},y=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},z=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},A=function(b){if(b!==w||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),w=b;return n.currTemplate.closeBtn},B=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},C=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isIE7=b.indexOf("MSIE 7.")!==-1,n.isIE8=b.indexOf("MSIE 8.")!==-1,n.isLowIE=n.isIE7||n.isIE8,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=C(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),t=a(document),n.popupsCache={}},open:function(b){s||(s=a(document.body));var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],v="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=t,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=y("bg").on("click"+j,function(){n.close()}),n.wrap=y("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=y("container",n.wrap)),n.contentContainer=y("content"),n.st.preloader&&(n.preloader=y("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}z("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(x(f,function(a,b,c,d){c.close_replaceWith=A(d.type)}),v+=" mfp-close-btn-in"):n.wrap.append(A())),n.st.alignTop&&(v+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:t.height(),position:"absolute"}),n.st.enableEscapeKey&&t.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(v+=" mfp-auto-cursor"),v&&n.wrap.addClass(v);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),z("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||s),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),t.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),z(g),b},close:function(){if(!n.isOpen)return;z(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){z(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}t.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,z(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),z("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;z("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;z("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}u&&u!==b.type&&n.container.removeClass("mfp-"+u+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,z(h,b),u=b.type,n.container.prepend(n.contentContainer),z("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(A()):n.content=a:n.content="",z(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,z("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};z("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?t.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),z(f,[b,c,d]),a.each(c,function(a,c){if(c===undefined||c===!1)return!0;e=a.split("_");if(e.length>1){var d=b.find(j+"-"+e[0]);if(d.length>0){var f=e[1];f==="replaceWith"?d[0]!==c[0]&&d.replaceWith(c):f==="img"?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(j+"-"+a).html(c)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.id="mfp-sbm",a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return B(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},a.fn.magnificPopup=function(b){B();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var D="inline",E,F,G,H=function(){G&&(F.after(G.addClass(E)).detach(),G=null)};a.magnificPopup.registerModule(D,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){n.types.push(D),x(b+"."+D,function(){H()})},getInline:function(b,c){H();if(b.src){var d=n.st.inline,e=a(b.src);if(e.length){var f=e[0].parentNode;f&&f.tagName&&(F||(E=d.hiddenClass,F=y(E),E="mfp-"+E),G=e.after(F).detach().removeClass(E)),n.updateStatus("ready")}else n.updateStatus("error",d.tNotFound),e=a("<div>");return b.inlineElement=e,e}return n.updateStatus("ready"),n._parseMarkup(c,{},b),c}}});var I="ajax",J,K=function(){J&&s.removeClass(J)},L=function(){K(),n.req&&n.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){n.types.push(I),J=n.st.ajax.cursor,x(b+"."+I,L),x("BeforeChange."+I,L)},getAjax:function(b){J&&s.addClass(J),n.updateStatus("loading");var c=a.extend({url:b.src,success:function(c,d,e){var f={data:c,xhr:e};z("ParseAjax",f),n.appendContent(a(f.data),I),b.finished=!0,K(),n._setFocus(),setTimeout(function(){n.wrap.addClass(k)},16),n.updateStatus("ready"),z("AjaxContentAdded")},error:function(){K(),b.finished=b.loadError=!0,n.updateStatus("error",n.st.ajax.tError.replace("%url%",b.src))}},n.st.ajax.settings);return n.req=a.ajax(c),""}}});var M,N=function(b){if(b.data&&b.data.title!==undefined)return b.data.title;var c=n.st.image.titleSrc;if(c){if(a.isFunction(c))return c.call(n,b);if(b.el)return b.el.attr(c)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var a=n.st.image,c=".image";n.types.push("image"),x(g+c,function(){n.currItem.type==="image"&&a.cursor&&s.addClass(a.cursor)}),x(b+c,function(){a.cursor&&s.removeClass(a.cursor),r.off("resize"+j)}),x("Resize"+c,n.resizeImage),n.isLowIE&&x("AfterChange",n.resizeImage)},resizeImage:function(){var a=n.currItem;if(!a||!a.img)return;if(n.st.image.verticalFit){var b=0;n.isLowIE&&(b=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",n.wH-b)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,M&&clearInterval(M),a.isCheckingImgSize=!1,z("ImageHasSize",a),a.imgHidden&&(n.content&&n.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var b=0,c=a.img[0],d=function(e){M&&clearInterval(M),M=setInterval(function(){if(c.naturalWidth>0){n._onImageHasSize(a);return}b>200&&clearInterval(M),b++,b===3?d(10):b===40?d(50):b===100&&d(500)},e)};d(1)},getImage:function(b,c){var d=0,e=function(){b&&(b.img[0].complete?(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("ready")),b.hasSize=!0,b.loaded=!0,z("ImageLoadComplete")):(d++,d<200?setTimeout(e,100):f()))},f=function(){b&&(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("error",g.tError.replace("%url%",b.src))),b.hasSize=!0,b.loaded=!0,b.loadError=!0)},g=n.st.image,h=c.find(".mfp-img");if(h.length){var i=document.createElement("img");i.className="mfp-img",b.img=a(i).on("load.mfploader",e).on("error.mfploader",f),i.src=b.src,h.is("img")&&(b.img=b.img.clone()),i=b.img[0],i.naturalWidth>0?b.hasSize=!0:i.width||(b.hasSize=!1)}return n._parseMarkup(c,{title:N(b),img_replaceWith:b.img},b),n.resizeImage(),b.hasSize?(M&&clearInterval(M),b.loadError?(c.addClass("mfp-loading"),n.updateStatus("error",g.tError.replace("%url%",b.src))):(c.removeClass("mfp-loading"),n.updateStatus("ready")),c):(n.updateStatus("loading"),b.loading=!0,b.hasSize||(b.imgHidden=!0,c.addClass("mfp-loading"),n.findImageSize(b)),c)}}});var O,P=function(){return O===undefined&&(O=document.createElement("p").style.MozTransform!==undefined),O};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;x("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,z("ZoomAnimationEnded")},16)},f)},16)}}),x(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),x(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return P()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}});var Q="iframe",R="http://about:blank",S=function(a){if(n.currTemplate[Q]){var b=n.currTemplate[Q].find("iframe");b.length&&(a||(b[0].src=R),n.isIE8&&b.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(Q,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="http://about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"http://www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"http://player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"http://maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){n.types.push(Q),x("BeforeChange",function(a,b,c){b!==c&&(b===Q?S():c===Q&&S(!0))}),x(b+"."+Q,function(){S()})},getIframe:function(b,c){var d=b.src,e=n.st.iframe;a.each(e.patterns,function(){if(d.indexOf(this.index)>-1)return this.id&&(typeof this.id=="string"?d=d.substr(d.lastIndexOf(this.id)+this.id.length,d.length):d=this.id.call(this,d)),d=this.src.replace("%id%",d),!1});var f={};return e.srcAction&&(f[e.srcAction]=d),n._parseMarkup(c,f,b),n.updateStatus("ready"),c}}});var T=function(a){var b=n.items.length;return a>b-1?a-b:a<0?b+a:a},U=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=n.st.gallery,d=".mfp-gallery",e=Boolean(a.fn.mfpFastClick);n.direction=!0;if(!c||!c.enabled)return!1;v+=" mfp-gallery",x(g+d,function(){c.navigateByImgClick&&n.wrap.on("click"+d,".mfp-img",function(){if(n.items.length>1)return n.next(),!1}),t.on("keydown"+d,function(a){a.keyCode===37?n.prev():a.keyCode===39&&n.next()})}),x("UpdateStatus"+d,function(a,b){b.text&&(b.text=U(b.text,n.currItem.index,n.items.length))}),x(f+d,function(a,b,d,e){var f=n.items.length;d.counter=f>1?U(c.tCounter,e.index,f):""}),x("BuildControls"+d,function(){if(n.items.length>1&&c.arrows&&!n.arrowLeft){var b=c.arrowMarkup,d=n.arrowLeft=a(b.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(m),f=n.arrowRight=a(b.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(m),g=e?"mfpFastClick":"click";d[g](function(){n.prev()}),f[g](function(){n.next()}),n.isIE7&&(y("b",d[0],!1,!0),y("a",d[0],!1,!0),y("b",f[0],!1,!0),y("a",f[0],!1,!0)),n.container.append(d.add(f))}}),x(h+d,function(){n._preloadTimeout&&clearTimeout(n._preloadTimeout),n._preloadTimeout=setTimeout(function(){n.preloadNearbyImages(),n._preloadTimeout=null},16)}),x(b+d,function(){t.off(d),n.wrap.off("click"+d),n.arrowLeft&&e&&n.arrowLeft.add(n.arrowRight).destroyMfpFastClick(),n.arrowRight=n.arrowLeft=null})},next:function(){n.direction=!0,n.index=T(n.index+1),n.updateItemHTML()},prev:function(){n.direction=!1,n.index=T(n.index-1),n.updateItemHTML()},goTo:function(a){n.direction=a>=n.index,n.index=a,n.updateItemHTML()},preloadNearbyImages:function(){var a=n.st.gallery.preload,b=Math.min(a[0],n.items.length),c=Math.min(a[1],n.items.length),d;for(d=1;d<=(n.direction?c:b);d++)n._preloadItem(n.index+d);for(d=1;d<=(n.direction?b:c);d++)n._preloadItem(n.index-d)},_preloadItem:function(b){b=T(b);if(n.items[b].preloaded)return;var c=n.items[b];c.parsed||(c=n.parseEl(b)),z("LazyLoad",c),c.type==="image"&&(c.img=a('<img class="mfp-img" />').on("load.mfploader",function(){c.hasSize=!0}).on("error.mfploader",function(){c.hasSize=!0,c.loadError=!0,z("LazyLoadError",c)}).attr("src",c.src)),c.preloaded=!0}}}),B()})(window.jQuery||window.Zepto)
//Hook up generic modals
$(document).ready(function() {
	$('.openPopup[modalType!="iframe"]').each(function(){
		var popupType = $(this).attr('popupType');
		if (!popupType || popupType == "")
			popupType = 'inline';
		$(this).magnificPopup({
			type: popupType,
			midClick: true
			}); 
	});
});
//Make sure any modals that are nested within page contents get moved into the main form that surrounds the entire page.
//This way the modals do not inherit unwanted styles but still grab data from .NET controls when put into iAPPS
$(document).ready(function()
    {
        var modals = $('.popup');
        var appendElement = 'form';
        if ($(appendElement).length <= 0)
        {
            appendElement = 'body';
        }
        modals.detach();
        $(appendElement).append(modals);
    });


/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
window.matchMedia=window.matchMedia||function(a){var c=a.documentElement,d=c.firstElementChild||c.firstChild,e=a.createElement("body"),f=a.createElement("div");f.id="mq-test-1",f.style.cssText="position:absolute;top:-100em",e.style.background="none",e.appendChild(f);var i,g=function(a){return f.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',c.insertBefore(e,d),bool=42===f.offsetWidth,c.removeChild(e),{matches:bool,media:a}},h=function(){var b,d=c.body,e=!1;return f.style.cssText="position:absolute;font-size:1em;width:1em",d||(d=e=a.createElement("body"),d.style.background="none"),d.appendChild(f),c.insertBefore(d,c.firstChild),e?c.removeChild(d):d.removeChild(f),b=i=parseFloat(f.offsetWidth)},j=g("(min-width: 0px)").matches;return function(b){if(j)return g(b);var c=b.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),d=b.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),e=null===c,f=null===d,k=a.body.offsetWidth,l="em";return c&&(c=parseFloat(c)*(c.indexOf(l)>-1?i||h():1)),d&&(d=parseFloat(d)*(d.indexOf(l)>-1?i||h():1)),bool=(!e||!f)&&(e||k>=c)&&(f||d>=k),{matches:bool,media:b}}}(document);
/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */
!function(a){"use strict";a.picturefill=function(){for(var b=a.document.getElementsByTagName("span"),c=0,d=b.length;d>c;c++)if(null!==b[c].getAttribute("data-picture")){for(var e=b[c].getElementsByTagName("span"),f=[],g=0,h=e.length;h>g;g++){var i=e[g].getAttribute("data-media");(!i||a.matchMedia&&a.matchMedia(i).matches)&&f.push(e[g])}var j=b[c].getElementsByTagName("img")[0];if(f.length){var k=f.pop();if(j&&"NOSCRIPT"!==j.parentNode.nodeName){if(k===j.parentNode)continue}else j=a.document.createElement("img"),j.alt=b[c].getAttribute("data-alt");j.src=k.getAttribute("data-src"),k.appendChild(j),j.removeAttribute("width"),j.removeAttribute("height")}else j&&j.parentNode.removeChild(j)}},a.addEventListener?(a.addEventListener("resize",a.picturefill,!1),a.addEventListener("DOMContentLoaded",function(){a.picturefill(),a.removeEventListener("load",a.picturefill,!1)},!1),a.addEventListener("load",a.picturefill,!1)):a.attachEvent&&a.attachEvent("onload",a.picturefill)}(this);

//FastClick: polyfill to remove click delays on browsers with touch UIs.
// https://github.com/ftlabs/fastclick
function FastClick(t,e){"use strict";function i(t,e){return function(){return t.apply(e,arguments)}}var n;if(e=e||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=e.touchBoundary||10,this.layer=t,this.tapDelay=e.tapDelay||200,!FastClick.notNeeded(t)){for(var o=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],r=this,s=0,c=o.length;c>s;s++)r[o[s]]=i(r[o[s]],r);deviceIsAndroid&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,i,n){var o=Node.prototype.removeEventListener;"click"===e?o.call(t,e,i.hijacked||i,n):o.call(t,e,i,n)},t.addEventListener=function(e,i,n){var o=Node.prototype.addEventListener;"click"===e?o.call(t,e,i.hijacked||(i.hijacked=function(t){t.propagationStopped||i(t)}),n):o.call(t,e,i,n)}),"function"==typeof t.onclick&&(n=t.onclick,t.addEventListener("click",function(t){n(t)},!1),t.onclick=null)}}var deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),deviceIsIOS4=deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),deviceIsIOSWithBadTarget=deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),deviceIsBlackBerry10=navigator.userAgent.indexOf("BB10")>0;FastClick.prototype.needsClick=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(deviceIsIOS&&"file"===t.type||t.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(t.className)},FastClick.prototype.needsFocus=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!deviceIsAndroid;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},FastClick.prototype.sendClick=function(t,e){"use strict";var i,n;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),n=e.changedTouches[0],i=document.createEvent("MouseEvents"),i.initMouseEvent(this.determineEventType(t),!0,!0,window,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),i.forwardedTouchEvent=!0,t.dispatchEvent(i)},FastClick.prototype.determineEventType=function(t){"use strict";return deviceIsAndroid&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},FastClick.prototype.focus=function(t){"use strict";var e;deviceIsIOS&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},FastClick.prototype.updateScrollParent=function(t){"use strict";var e,i;if(e=t.fastClickScrollParent,!e||!e.contains(t)){i=t;do{if(i.scrollHeight>i.offsetHeight){e=i,t.fastClickScrollParent=i;break}i=i.parentElement}while(i)}e&&(e.fastClickLastScrollTop=e.scrollTop)},FastClick.prototype.getTargetElementFromEventTarget=function(t){"use strict";return t.nodeType===Node.TEXT_NODE?t.parentNode:t},FastClick.prototype.onTouchStart=function(t){"use strict";var e,i,n;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),i=t.targetTouches[0],deviceIsIOS){if(n=window.getSelection(),n.rangeCount&&!n.isCollapsed)return!0;if(!deviceIsIOS4){if(i.identifier&&i.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=i.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=i.pageX,this.touchStartY=i.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},FastClick.prototype.touchHasMoved=function(t){"use strict";var e=t.changedTouches[0],i=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>i||Math.abs(e.pageY-this.touchStartY)>i?!0:!1},FastClick.prototype.onTouchMove=function(t){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},FastClick.prototype.findControl=function(t){"use strict";return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},FastClick.prototype.onTouchEnd=function(t){"use strict";var e,i,n,o,r,s=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,i=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,deviceIsIOSWithBadTarget&&(r=t.changedTouches[0],s=document.elementFromPoint(r.pageX-window.pageXOffset,r.pageY-window.pageYOffset)||s,s.fastClickScrollParent=this.targetElement.fastClickScrollParent),n=s.tagName.toLowerCase(),"label"===n){if(e=this.findControl(s)){if(this.focus(s),deviceIsAndroid)return!1;s=e}}else if(this.needsFocus(s))return t.timeStamp-i>100||deviceIsIOS&&window.top!==window&&"input"===n?(this.targetElement=null,!1):(this.focus(s),this.sendClick(s,t),deviceIsIOS&&"select"===n||(this.targetElement=null,t.preventDefault()),!1);return deviceIsIOS&&!deviceIsIOS4&&(o=s.fastClickScrollParent,o&&o.fastClickLastScrollTop!==o.scrollTop)?!0:(this.needsClick(s)||(t.preventDefault(),this.sendClick(s,t)),!1)},FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},FastClick.prototype.onMouse=function(t){"use strict";return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},FastClick.prototype.onClick=function(t){"use strict";var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},FastClick.prototype.destroy=function(){"use strict";var t=this.layer;deviceIsAndroid&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},FastClick.notNeeded=function(t){"use strict";var e,i,n;if("undefined"==typeof window.ontouchstart)return!0;if(i=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!deviceIsAndroid)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(i>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(deviceIsBlackBerry10&&(n=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),n[1]>=10&&n[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction?!0:!1},FastClick.attach=function(t,e){"use strict";return new FastClick(t,e)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){"use strict";return FastClick}):"undefined"!=typeof module&&module.exports?(module.exports=FastClick.attach,module.exports.FastClick=FastClick):window.FastClick=FastClick;