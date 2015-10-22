/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-play' : '&#xe000;',
			'icon-signup' : '&#xe001;',
			'icon-star' : '&#xe002;',
			'icon-bookmark' : '&#xe003;',
			'icon-location' : '&#xe004;',
			'icon-bubbles' : '&#xe005;',
			'icon-thumbs-up' : '&#xe006;',
			'icon-close' : '&#xe007;',
			'icon-rocket' : '&#xe008;',
			'icon-target' : '&#xe009;',
			'icon-stats' : '&#xe00a;',
			'icon-share' : '&#xe00b;',
			'icon-alarm' : '&#xe00c;',
			'icon-spinner' : '&#xe00e;',
			'icon-google' : '&#xe00f;',
			'icon-bing' : '&#xe010;',
			'icon-checkmark' : '&#xe00d;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};