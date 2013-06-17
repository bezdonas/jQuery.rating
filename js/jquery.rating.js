(function($) {

	$.fn.rating = function(options) {

		var o = $.extend({}, $.fn.rating.defaults, options);

		return this.each(function() {

			var cont = $(this),
				input = $('input', cont),
				label = $('label', cont),
				startActive = label.filter('[for="' + input.filter(':checked').attr('id') + '"]'),
				userActive = false,
				el;

			activateStar(startActive);

			label
				.each(function() {
					el = $(this);
					el
						.data('text', el.text())
						.text('');
				})
				.on('mouseover.rating', cont, function() {
					activateStar($(this));
					if (o.output) {
						$(o.outputSelector, cont).text($(this).data('text'));
					}
				})
				.on('mouseleave.rating', cont, function() {
					var el = userActive ? userActive : startActive;
					activateStar(el);
					if (o.output) {
						$(o.outputSelector, cont).text('');
					}
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
					if (o.callback) {
						o.callback.call($(this));
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

		output: false,
		outputSelector: '.output',

		lockAfterRated: false,
		lockClass: 'locked',

		send: false,
		sendUrl: '.',
		sendMethod: 'get',

		callback: function() {
			// $(this) is currently active label
		}
	};

}(jQuery));
