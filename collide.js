//crude script to extract ^assert. statements from code blocks and check collisions

var asserts = [];
var index = [];
var names = [];
var dupeNames = [];

var count = 0;
var uniques = 0;
var collide = 0;
var dupes = 0;

var padLeft = function (str, len, char) {
	str = '' + str;
	while (str.length < len) {
		str = char + str;
	}
	return str;
};

//parse lines, look for code blocks, collect lines starting with 'assert.'
(function () {
	var fs = require('fs');
	var doc = fs.readFileSync('README.md', 'utf8');

	var lineExp = /[\r\n]+/g;
	var blockExp = /^[ \t]*```+/;
	var assertExp = /^[ \t]*assert\.([\w\._]+)(.*)/;
	var header = /^[ \t]*#+[ \t]*([\w_ -]+[\w])/;
	var i = 0;
	var tmp;
	var inBlock = false
	//brutal split  ftw
	var lines = doc.split(lineExp);
	var lastHead;

	console.log(' ');
	console.log('parsing ' + lines.length + ' lines');
	console.log(' ');

	lines.forEach(function (line, num, lines) {
		if (!inBlock) {
			header.lastIndex = 0;
			tmp = header.exec(line);
			if (tmp) {
				lastHead = tmp[1];
				return;
			}
		}

		blockExp.lastIndex = 0;
		tmp = blockExp.exec(line);
		if (tmp) {
			inBlock = !inBlock;
			return;
		}
		if (!inBlock) {
			return;
		}
		assertExp.lastIndex = 0;
		tmp = assertExp.exec(line);
		if (tmp && tmp.length > 1) {
			asserts.push({name: tmp[1], head:lastHead, arg: tmp[2], line: i, full: 'assert.' + tmp[1] + ' ' + tmp[2]});
		}
		i++;
	});

})();

//sum collisions
(function () {
	asserts.forEach(function (data, num, lines) {
		count++;
		if (index.hasOwnProperty(data.name)) {
			index[data.name].push(data);
		}
		else {
			index[data.name] = [data];
			names.push(data.name);
		}
	});
})();

//print result
(function () {
	var data;

	names = names.sort();
	names.forEach(function (name) {
		if (index.hasOwnProperty(name)) {
			var arr = index[name];
			data = arr[0];
			if (arr.length == 1) {
				console.log('   ' + data.full);
				uniques++;
			}
			else if (arr.length > 1) {
				dupes++;
				dupeNames.push(data.name);
				console.log('!  assert.' + data.name);
				var obj = {};
				var parts = [];
				var headers = [];
				arr.forEach(function (data, num) {
					collide++;
					if (obj.hasOwnProperty(data.head)) {
						obj[data.head].push(data);
					}
					else {
						obj[data.head] = [data];
						parts.push(data.head);
						headers.push(data.head);
					}
				});

				headers = headers.sort();
				headers.forEach(function (head) {
					var tmp = obj[head]
					console.log('     ' + head);
					tmp.forEach(function (data) {
						console.log('        ' + padLeft(data.line, 4, ' ') + '  ' + data.full);
					});
				});

				console.log('');
			}
		}
	});
	console.log('');
	console.log('asserts: ' + count);
	console.log('uniques: ' + uniques);
	console.log('collide: ' + collide)
	console.log('dupes: ' + dupes);

	dupeNames = dupeNames.sort();
	dupeNames.forEach(function (name) {
		if (index.hasOwnProperty(name)) {
			console.log('   -> assert.' + name + ' x ' + index[name].length);
		}
	});
})();
