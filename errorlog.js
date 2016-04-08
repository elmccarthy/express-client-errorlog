(function(errorlog, $) {
	errorlog.configure = function(options) {
		errorlog.url = (options.prefix || '') + 'errorlog';
	};
	errorlog.log = function(error) {
		$.ajax({
			type: 'POST',
			url: errorlog.url,
			data: error,
			contentType: 'text/plain'
		});
	};
	if (!$) {
		throw new Error("jQuery is not available");
	}
	var match = new Error().stack.match(/https?:\/\/(.+):\d+:\d+/); // see <https://stackoverflow.com/questions/2976651/javascript-how-do-i-get-the-url-of-script-being-called#comment60538797_22165218>
	if (match) {
		match = match[1].match(/[^/]+\/(.*\/)/);
		var prefix = match ? match[1] : '';
		errorlog.configure({prefix: prefix});
	}
	window.onerror = function(message, file, line) {
		errorlog.log(message + ' (' + file + ':' + line + ')');
	};
})(window.errorlog || (window.errorlog = {}), window.jQuery);
