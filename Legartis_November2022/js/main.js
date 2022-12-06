(function () {
  // Polyfill for NodeList.prototype.forEach() in IE
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  // Variables
  var nav = document.querySelector('.header__navigation');
  var langSwitcher = document.querySelector('.header__language-switcher');
  var search = document.querySelector('.header__search');
  var allToggles = document.querySelectorAll('.header--toggle');
  var navToggle = document.querySelector('.header__navigation--toggle');
  var langToggle = document.querySelector('.header__language-switcher--toggle');
  var searchToggle = document.querySelector('.header__search--toggle');
  var closeToggle = document.querySelector('.header__close--toggle');
  var allElements = document.querySelectorAll(
    '.header--element, .header--toggle'
  );
  var emailGlobalUnsub = document.querySelector('input[name="globalunsub"]');

  // Functions

  // Function for executing code on document ready
  function domReady(callback) {
    if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  // Function for toggling mobile navigation
  function toggleNav() {
    allToggles.forEach(function (toggle) {
      toggle.classList.toggle('hide');
    });

    nav.classList.toggle('open');
    navToggle.classList.toggle('open');

    closeToggle.classList.toggle('show');
  }

  // Function for toggling mobile language selector
  function toggleLang() {
    allToggles.forEach(function (toggle) {
      toggle.classList.toggle('hide');
    });

    langSwitcher.classList.toggle('open');
    langToggle.classList.toggle('open');

    closeToggle.classList.toggle('show');
  }

  // Function for toggling mobile search field
  function toggleSearch() {
    allToggles.forEach(function (toggle) {
      toggle.classList.toggle('hide');
    });

    search.classList.toggle('open');
    searchToggle.classList.toggle('open');

    closeToggle.classList.toggle('show');
  }

  // Function for the header close option on mobile
  function closeAll() {
    allElements.forEach(function (element) {
      element.classList.remove('hide', 'open');
    });

    closeToggle.classList.remove('show');
  }

  // Function to disable the other checkbox inputs on the email subscription system page template
  function toggleDisabled() {
    var emailSubItem = document.querySelectorAll('#email-prefs-form .item');

    emailSubItem.forEach(function(item){
      var emailSubItemInput = item.querySelector('input');

      if (emailGlobalUnsub.checked) {
        item.classList.add('disabled');
        emailSubItemInput.setAttribute('disabled', 'disabled');
        emailSubItemInput.checked = false;
      } else {
        item.classList.remove('disabled');
        emailSubItemInput.removeAttribute('disabled');
      }
    });
  }

  // Execute JavaScript on document ready
  domReady(function () {
    if (!document.body) {
      return;
    } else {

      // Function dependent on language switcher
      if (langSwitcher) {
        langToggle.addEventListener('click', toggleLang);
      }

      // Function dependent on navigation
      if (navToggle) {
        navToggle.addEventListener('click', toggleNav);
      }

      // Function dependent on search field
      if (searchToggle) {
        searchToggle.addEventListener('click', toggleSearch);
      }

      // Function dependent on close toggle
      if (closeToggle) {
        closeToggle.addEventListener('click', closeAll);
      }

      // Function dependent on email unsubscribe from all input
      if (emailGlobalUnsub) {
        emailGlobalUnsub.addEventListener('change', toggleDisabled);
      }

    }
  });

})();







// menu


/**
 * Create an anonymous function to avoid library conflicts
 */
(function($) {
    /**
     * Add our plugin to the jQuery.fn object
     */
    $.fn.responsiveMenu = function(options) {
        /**
         * Define some default settings
         */

        $.fn.responsiveMenu.defaultOptions = {
            "menuIcon_text": '',
			"menuslide_overlap":false,
            "menuslide_push":false,
            "menuslide_direction":''
        };
        /**
         * Merge the runtime options with the default settings
         */
        var options = $.extend({}, $.fn.responsiveMenu.defaultOptions, options);
        /**
         * Iterate through the collection of elements and
         * return the object to preserve method chaining
         */
        return this.each(function(i) {
            var menuobj = $(this);
            var mobileSubMenu;
            var subMenuArrows;
            var mobFlag = false;
            var deskFlag = false;
            var defaultMenu = false;
            createMobileStructure(menuobj);
            mobileMenuInit(menuobj);

            function removeDesktopMenu(menuobj) {
                menuobj.removeClass('desk');
                mobileSubMenu.next().stop(true, true).slideUp();
                subMenuArrows.removeClass('up');
                if(defaultMenu){
                    menuobj.slideUp();
                }
                menuobj.find(".menu-icon").removeClass('active');
            }

            function createMobileStructure(menuobj) {
                if (menuobj.prev('.menu-icon').length == 0) {
                    menuobj.wrapAll('<div class="enumenu_container"></div>');
                    //$('<div class="menu-icon">' + options.menuIcon_text + '</div>').insertBefore(menuobj);
                    $('<div class="menu-icon"> <div class="menu-box"><span></span><span></span><span></span> </div>' + options.menuIcon_text + '</div>').insertBefore(menuobj);
                    //menuobj.find('ul').prev('a').addClass('menubelow');
                    $("> li > a", menuobj).addClass("firstLevel");
                    menuobj.find("li").each(function() {
                        if ($(this).children("ul") || $(this).children("div")) {
                            $(this).children().prev('a').addClass('menubelow');
                        }
                    });
                }
                mobileSubMenu = menuobj.find('a.menubelow');
                if (menuobj.find('.arrow').length == 0) {
                    mobileSubMenu.each(function() {
                        $(this).closest('li').prepend('<span class="arrow"></span>');
                        $(this).next().addClass("sb-menu");
                    });
                    subMenuArrows = menuobj.find('.arrow');
                }
                
                
                if(options.menuslide_overlap){
                    $('body').addClass('menuOverlap');
                   
                } else if(options.menuslide_push){
                    $('body').addClass('menuslide_push');
                    
                }
                if((options.menuslide_overlap || options.menuslide_push) && options.menuslide_direction==""){
                    $('body').addClass('slidemenuRight');
                }
                if(options.menuslide_direction=="left"){
                    $('body').addClass('slidemenuLeft');
                    
                }else if(options.menuslide_direction=="right"){
                    $('body').addClass('slidemenuRight');
                    
                }
            }

            function bindClickonMobilemenu(menuobj) {
                menuobj.find('.arrow').on('touchstart click', function(e) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    var submenu = $(this).closest('li').children('.sb-menu');
                    var sibilingsOfCurrent_obj = $(this).closest('li').siblings();
                    var this_parentLi = $(this).closest('li');
                    if ($(".menu-icon").is(":visible")) {
                        if (submenu.length > 0) {
                            sibilingsOfCurrent_obj.find('.sb-menu').stop(true, true).slideUp(); // comment to close
                            sibilingsOfCurrent_obj.find('.sb-menu').each(function() {
                                $(this).closest('li').find('>span').removeClass('up'); // 
                            });
                        }
                        if (!submenu.is(':visible')) {
                            submenu.find('.sb-menu').each(function() {
                                $(this).stop().slideUp();
                                $(this).closest('li').find('span').removeClass('up')
                            });
                            submenu.stop().slideDown();
                            this_parentLi.find('>span').addClass('up');
                        } else {
                            submenu.slideUp();
                            this_parentLi.find('>span').removeClass('up');
                        }
                    }
                });
            }

            function removeMobileMenu(menuobj) {
                menuobj.find('.menubelow').each(function() {
                    $(this).removeAttr('style');
                    $(this).next().removeAttr('style');
                });
                menuobj.find('.arrow').remove();
                menuobj.prev(".menu-icon").removeClass('active');
                menuobj.addClass('desk').removeAttr("style");
                menuobj.removeAttr("style");
                $("body").removeClass("menu-open");
                deskFlag = false;
            }

            $(window).resize(function(e) {
                mobileMenuInit(menuobj);
            });

            function mobileMenuInit(menuobj) {
                if((options.menuslide_overlap == false && options.menuslide_push == false) || (options.menuslide_overlap == true && options.menuslide_push == true)){
                   defaultMenu = true; 
                }
                if (menuobj.prev(".menu-icon").is(":visible")) {
                    if (!mobFlag) {
                        removeDesktopMenu(menuobj);
                        createMobileStructure(menuobj);
                        bindClickonMobilemenu(menuobj);
                        mobFlag = true;
                        deskFlag = false;
                        menuobj.removeClass('desk');
                        $('body').removeClass('desk');
                        menuobj.addClass('mob');
                        $('body').addClass('mob');
                    }
                } else {
                    if (!deskFlag) {
                        removeMobileMenu(menuobj);
                        mobFlag = false;
                        deskFlag = true;
                        menuobj.removeClass('mob');
                        $('body').removeClass('mob');
                        menuobj.addClass('desk');
                        $('body').addClass('desk');

                    }
                }
            }
            // Toggle menu
            menuobj.prev(".menu-icon").on('click', function(e){
            //$(document).on('click', ".menu-icon", function(e) {
                e.stopPropagation();
                e.preventDefault();
                if ($(this).hasClass('active')) {
                    closeMobileMenu(menuobj);
                } else {
                    if(defaultMenu){
                        $(this).next().slideDown();
                    }
                    $(this).addClass("active");
                    $("body").addClass("menu-open");
                }
            });
            $('body').on('click touchstart', function(e) {
                if (menuobj.prev(".menu-icon").is(":visible")) {
                    if ($(e.target).closest(".enumenu_container").length == 0 && !$(e.target).hasClass('active')) {
                        closeMobileMenu(menuobj);
                    }
                }
            });

            function closeMobileMenu(menuobj) {
                $("body").removeClass("menu-open");
                if(defaultMenu){
                    menuobj.stop().slideUp();
                }
                menuobj.prev(".menu-icon").removeClass('active');
                menuobj.find('.arrow').removeClass('up');
                menuobj.find('.sb-menu').stop(true, true).slideUp();
            }

                if ( 'ontouchstart' in window ) {

                    //$(".enumenu_ul > li > a, .enumenu_ul.desk li > ul > li > a").click(function(e) {
                    menuobj.find("a").click(function(e) {
                            if (!$(this).hasClass("link") && !$("body").hasClass("mob") && $(this).next().length > 0) {
                                e.preventDefault();
                                if ($(this).hasClass("firstLevel")) {
                                    menuobj.find("a").removeClass("link");
                                    menuobj.find("a").parent().removeClass("hover");
                                }
                                $(this).addClass("link");
                                $(this).parent().addClass('hover');
                            }
                    })
                    $('body').on('click touchstart', function(e) {
                        if ($(e.target).closest(".enumenu_container").length == 0) {
                            menuobj.find("a").each(function(){
                                $(this).removeClass("link");
                                $(this).parent().removeClass("hover");
                            });
                        }
                    });
                    /*$("body > div").on('click', function(e) {
                        if ($(e.target).closest(".enumenu_container").length == 0) {
                            menuobj.find("a").each(function(){
                                $(this).removeClass("link");
                                $(this).parent().removeClass("hover");
                            });
                            
                        }
                    });*/
                } else {
                    
                    menuobj.find("li").mouseenter(function() {
                        $(this).addClass('hover');
                    });
                    menuobj.find("li").mouseleave(function() {
                        $(this).removeClass('hover');
                    });
                }
            
        });
    };
})(jQuery);

$(document).ready(function() {
   
     
        $(".lang-box").clone().appendTo(".language-switch");
    $('.header-button').clone().addClass('menu-outter-button').appendTo( ".menu.enumenu_ul" )
   $('.language-switch').clone().addClass('language-switch-v1').appendTo( ".menu.enumenu_ul" )
   
});


$.each($('.lang_list_class li'),function(){
    var data_lang=$(this).find('a').data('language').toUpperCase();
    var text_d=$(this).find('a').text();
    $(this).find('a').text(data_lang);
});



$(document).ready(function(){
    
$(".hs-input.is-placeholder").append(
      '<div class="fen"></div>'
    );
   
});



$( document ).ready(function() {

if($('.legartis').hasClass('white-header')){
    $('body').addClass('white-header');
    $('.legartis').removeClass('white-header');
}


if($('.inner-blog-index > .blog-index-box').size() == 0) {
$('.blog-post-related-post').remove()
}
});


var url = $(location).attr('href');
jQuery('.inner-blog-tag .widget-module li a').each(function(){

    if(jQuery(this).attr("href")==url){
        jQuery(this).addClass("active");        
    }
});






