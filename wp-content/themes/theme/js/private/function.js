var $ = jQuery;

$(document).ready(function() {
	$(window).scroll(function(e) {
		let t = $(this).scrollTop();

		let navUpdated = false;
		if(t > 1 && navUpdated === false) {
			$('nav').addClass('is-scrolled');
			navUpdated = true;
		}

		if(t <= 0) {
			$('nav').removeClass('is-scrolled');
			navUpdated = false;
		}
	});

	//Any video in wsiwyg will be responsive
	$('.wysiwyg iframe').wrap("<div class='iframe'/>");

	$('.menu-button').on('click', function() {
		$('.main-navigation').toggleClass('is-hidden-mobile-tablet');
	});

	$('.mobile-nav-trigger').on('click', function() {
		$(".main-menu").fadeToggle();
	});

	$('.nav-main-item>a').on('click', function() {
		var w = $(window).width();

		if (w <= 1023) {
			$(this)
				.next()
				.toggleClass('is-hidden-mobile-tablet');
			return false;
		}
	});

	$('.footer-nav').css('height', $("#first-footer-nav").height()+50);

	// Get IE or Edge browser version
	var version = detectIE();

	if (version === false) {
	} else if (version >= 12) {
	} else {
		$('body').css('display', 'block');
		$('.section__comparison a').css('display', 'block');
		$('.page-builder-container .section__comparison .comparison-cost svg').css(
			'bottom',
			'4.7rem'
		);
	}

	$('#' + location.pathname.split('/')[1]).addClass('current-menu');

	//Smooth scroll on anchors
	$(function() {
		$('a[href*="#"]:not([href="#"])').click(function() {
			if (
				location.pathname.replace(/^\//, '') ==
					this.pathname.replace(/^\//, '') &&
				location.hostname == this.hostname
			) {
				var target = $(this.hash);
				target = target.length
					? target
					: $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html, body').animate(
						{
							scrollTop: target.offset().top - 150
						},
						1000
					);
					return false;
				}
			}
		});
	});

	//Object Fit Polyfill
	var objectFitImages = (function() {
		'use strict';
		var t =
			'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
		var e = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g;
		var r = new Image();
		var i = 'object-fit' in r.style;
		var s = 'object-position' in r.style;
		var n = typeof r.currentSrc === 'string';
		var c = r.getAttribute;
		var o = r.setAttribute;
		var l = false;
		function a(t) {
			var r = getComputedStyle(t).fontFamily;
			var i;
			var s = {};
			while ((i = e.exec(r)) !== null) {
				s[i[1]] = i[2];
			}
			return s;
		}
		function u(e, r) {
			if (e[t].parsingSrcset) {
				return;
			}
			var s = a(e);
			s['object-fit'] = s['object-fit'] || 'fill';
			if (!e[t].s) {
				if (s['object-fit'] === 'fill') {
					return;
				}
				if (!e[t].skipTest && i && !s['object-position']) {
					return;
				}
			}
			var o = e.currentSrc || e.src;
			if (r) {
				o = r;
			} else if (e.srcset && !n && window.picturefill) {
				var l = window.picturefill._.ns;
				e[t].parsingSrcset = true;
				if (!e[l] || !e[l].evaled) {
					window.picturefill._.fillImg(e, { reselect: true });
				}
				if (!e[l].curSrc) {
					e[l].supported = false;
					window.picturefill._.fillImg(e, { reselect: true });
				}
				delete e[t].parsingSrcset;
				o = e[l].curSrc || o;
			}
			if (e[t].s) {
				e[t].s = o;
				if (r) {
					e[t].srcAttr = r;
				}
			} else {
				e[t] = { s: o, srcAttr: r || c.call(e, 'src'), srcsetAttr: e.srcset };
				e.src = t;
				if (e.srcset) {
					e.srcset = '';
					Object.defineProperty(e, 'srcset', { value: e[t].srcsetAttr });
				}
				f(e);
			}
			e.style.backgroundImage = 'url("' + o + '")';
			e.style.backgroundPosition = s['object-position'] || 'center';
			e.style.backgroundRepeat = 'no-repeat';
			if (/scale-down/.test(s['object-fit'])) {
				if (!e[t].i) {
					e[t].i = new Image();
					e[t].i.src = o;
				}
				(function u() {
					if (e[t].i.naturalWidth) {
						if (
							e[t].i.naturalWidth > e.width ||
							e[t].i.naturalHeight > e.height
						) {
							e.style.backgroundSize = 'contain';
						} else {
							e.style.backgroundSize = 'auto';
						}
						return;
					}
					setTimeout(u, 100);
				})();
			} else {
				e.style.backgroundSize = s['object-fit']
					.replace('none', 'auto')
					.replace('fill', '100% 100%');
			}
		}
		function f(e) {
			var r = {
				get: function() {
					return e[t].s;
				},
				set: function(r) {
					delete e[t].i;
					u(e, r);
					return r;
				}
			};
			Object.defineProperty(e, 'src', r);
			Object.defineProperty(e, 'currentSrc', { get: r.get });
		}
		function g() {
			if (!s) {
				HTMLImageElement.prototype.getAttribute = function(e) {
					if (this[t] && (e === 'src' || e === 'srcset')) {
						return this[t][e + 'Attr'];
					}
					return c.call(this, e);
				};
				HTMLImageElement.prototype.setAttribute = function(e, r) {
					if (this[t] && (e === 'src' || e === 'srcset')) {
						this[e === 'src' ? 'src' : e + 'Attr'] = String(r);
					} else {
						o.call(this, e, r);
					}
				};
			}
		}
		function A(e, r) {
			var i = !l && !e;
			r = r || {};
			e = e || 'img';
			if (s && !r.skipTest) {
				return false;
			}
			if (typeof e === 'string') {
				e = document.querySelectorAll('img');
			} else if (!e.length) {
				e = [e];
			}
			for (var n = 0; n < e.length; n++) {
				e[n][t] = e[n][t] || r;
				u(e[n]);
			}
			if (i) {
				document.body.addEventListener(
					'load',
					function(t) {
						if (t.target.tagName === 'IMG') {
							A(t.target, { skipTest: r.skipTest });
						}
					},
					true
				);
				l = true;
				e = 'img';
			}
			if (r.watchMQ) {
				window.addEventListener(
					'resize',
					A.bind(null, e, { skipTest: r.skipTest })
				);
			}
		}
		A.supportsObjectFit = i;
		A.supportsObjectPosition = s;
		g();
		return A;
	})();
	objectFitImages();
});

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
	var ua = window.navigator.userAgent;

	// Test values; Uncomment to check result …

	// IE 10
	// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

	// IE 11
	// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

	// Edge 12 (Spartan)
	// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

	// Edge 13
	// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}
