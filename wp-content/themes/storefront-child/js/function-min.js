!function($){$(window).scroll(function(e){var i=$(this).scrollTop(),o=!1;i>1&&!1===o&&($(".site-header").addClass("is-scrolled"),o=!0),i<=0&&($(".site-header").removeClass("is-scrolled"),o=!1)}),$(window).resize(function(){$(this).outerWidth()+15>599&&$(".menu").attr("style","")}),$(document).ready(function(){$(".mobile-nav-trigger").on("click",function(){$(".menu").fadeToggle()})})}(jQuery);