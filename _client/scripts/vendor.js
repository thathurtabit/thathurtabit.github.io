(function(window, undefined) {
	/*jshint undef:false*/
	'use strict';

	window.Scroller = window.Scroller || {};


	window.Scroller = function() {

		var components = [];
		var IS_VISIBLE = 'in-viewport';

		function addElement(el, callback) {
			components.push({
				el: el,
				callback: callback
			});
		}

		function isElementInViewPort(element) {
			var rect = element.getBoundingClientRect();


			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + element.clientHeight &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
		}

		function filterVisibleElements(component) {
			return !component.el.classList.contains(IS_VISIBLE);
		}

		function isInViewPort(component) {

			if(isElementInViewPort(component.el)) {
				component.el.classList.add(IS_VISIBLE);
				component.callback();
			}

		}

		function checkIfElementsHitViewport() {
			var nonVisibleElements = components.filter(filterVisibleElements);
			nonVisibleElements.forEach(isInViewPort);
		}

		function handleScrollEvent() {
			setTimeout(checkIfElementsHitViewport, 1000);
		}

		function init() {
			checkIfElementsHitViewport();
			window.addEventListener('scroll', handleScrollEvent, false);
		}

		return {
			init: init,
			addElement: addElement
		};
	}();

})(window);

//# sourceMappingURL=vendor.js.map
