(function($) {

	$.fn.rating = function(options) {

		var o = $.extend({}, $.fn.rating.defaults, options);

		return this.each(function() {

			var cont = $(this),
				input = $($('input'), cont),
				label = $($('label'), cont),
				startActive = label.filter('[for="' + input.filter(':checked').attr('id') + '"]'),
				userActive = false;

			activateStar(startActive);

			label
				.on('mouseover.rating', cont, function() {
					activateStar($(this));
				})
				.on('mouseleave.rating', cont, function() {
					activateStar(userActive ? userActive : startActive);
				})
				.on('click.rating', cont, function() {
					userActive = $(this);
					sendForm();
					if (o.animated) {
						animateCont();
					}
					if (o.lockAfterRated) {
						lockCont();
					}
				});


			function activateStar(obj) {
				label.removeClass(o.activeClass);
				obj
					.addClass(o.activeClass)
						.prevAll('label')
							.addClass(o.activeClass)
			};

			function animateCont() {
				cont.addClass(o.animeClass);
				setTimeout(function() {
					cont.removeClass(o.animeClass);
				}, o.animeDuration)
			};

			function lockCont() {
				cont.addClass(o.lockClass);
				label
					.off('mouseover.rating')
					.off('mouseleave.rating')
					.off('click.rating');
			};

			function sendForm() {
				setTimeout(function() {
					if (o.sendMethod === 'get') {
						$.get(o.sendUrl + '?' + cont.serialize());
					} else if (o.sendMethod === 'post') {
						$.post(o.sendUrl, cont.serialize());
					} else {
						cont.submit();
					}
				}, 0);
			};

		});

	};

	$.fn.rating.defaults = {
		activeClass: 'active',

		animated: true,
		animeClass: 'animated',
		animeDuration: 200,

		lockAfterRated: false,
		lockClass: 'locked',

		sendUrl: '.',
		sendMethod: 'get'
	};

}(jQuery));

$('#form-rating').rating({
	activeClass: 'b-rating_label__active',
	animeClass: 'b-rating__animated',
	lockClass: 'b-rating__locked'
});