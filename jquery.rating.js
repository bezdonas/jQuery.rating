(function($) {

	$.fn.rating = function(options) {

		var o = $.extend({}, $.fn.rating.defaults, options);

		return this.each(function() {

			var cont = $(this),
				contWidth = cont.width(),
				startClass = cont.attr('class'),
				starWidth = o.starWidth ? o.starWidth : contWidth / o.starQuantity,
				modClass = new RegExp(o['class'] + o['separator'] + '[0-9]', 'g'),
				newClass, activeStar, reg;

			cont
				.on('mousemove', function(e) {
					activeStar = Math.floor(e.offsetX / contWidth * o.starQuantity) + 1;
					newClass = o['class'] + o['separator'] + activeStar;
					cont[0].className = cont[0].className.replace(modClass, newClass);
				})

				.on('mouseleave', function() {
					cont.attr('class', startClass);
				})

				.on('click', function() {
					startClass = cont.attr('class');

					cont.addClass(o['animeClass']);
					setTimeout(function() {
						cont.removeClass(o['animeClass']);
					}, o['animeDuration']);
				});

		});

	};

	$.fn.rating.defaults = {
		'class': 'b-rating',
		'animeClass': 'b-rating__blink',
		'animeDuration': 200,
		'separator': '__',
		'starQuantity': 5
	};

}(jQuery));

$('.js-rating').rating();