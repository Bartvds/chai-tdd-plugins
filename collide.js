//crude script to extract ^assert. statements from code blocks and check collisions


var asserts = [];
var index = [];
var names = [];
var dupeNames = [];

var count = 0;
var unique = 0;
var collide = 0;
var dupes = 0;

var padLeft = function(str, len, char){
	str = '' + str;
	while(str.length < len){
		str = char + str;
	}
	return str;
};
var padRight = function(str, len, char){
	str = '' + str;
	while(str.length < len){
		str = str + char;
	}
	return str;
};

//parse markdown
(function () {
	var fs = require('fs');
	var doc = fs.readFileSync('README.md', 'utf8');

	var lineExp = /[\r\n]+/g;
	var blockExp = /^[ \t]*```+/g;
	var assertExp = /^[ \t]*assert\.([\w\._]+)(.*)/;
	var i = 0;
	var tmp;
	var inBlock = false
	//brutal split  ftw
	var lines = doc.split(lineExp);

	console.log(' ');
	console.log('parsing ' + lines.length + ' lines');
	console.log(' ');

	lines.forEach(function (line, num, lines) {
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
			asserts.push({name: tmp[1], arg: tmp[2], line: i, full: 'assert.' + tmp[1] + ' ' + tmp[2]});
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
				unique++;
			}
			else if (arr.length > 1) {
				dupes++;
				dupeNames.push(data.name);
				console.log('');
				console.log('!  assert.' + data.name);
				arr.forEach(function (data, num) {
					collide++;
					console.log('   -> ' + padLeft(data.line, 4, ' ') + '  ' + data.full);
				});
				console.log('');
			}
		}
	});
	console.log('');
	console.log('statements: ' + count);
	console.log('unique: ' + unique);
	console.log('collide: ' + collide)
	console.log('dupes: ' + dupes);
	dupeNames = dupeNames.sort();
	dupeNames.forEach(function (name) {
		if (index.hasOwnProperty(name)) {
			console.log('   -> assert.' + name + ' x ' + index[name].length);
		}
	});
})();