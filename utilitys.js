module.exports  = function(input) {
	

	
}
let toArray = function(str) {
		if(typeof str == 'string')
			return str.split('');
		else 
			return str;
	}
	global.utility = {
		"union" : function(...sets) {
			let union = [];
			sets.forEach(set => {
				union = new Set([...union, ...set])
			})
			return union
		},
		"intersect" : function(...sets) {
			return sets.reduce((a, b) => {a = toArray(a); b = toArray(b); return a.filter(c => b.includes(c))});
		},
		"replaceAll": function(str, reg, repalcement) {
			var re = new RegExp(reg,"g");
			return this.replace(new RegExp(reg,"g"), repalcement);
		},
		"timeFunction": function(func, input) {
			var start = new Date()
			var hrstart = process.hrtime()
			var simulateTime = 5
			var hrend;
			func(...input)
			hrend = process.hrtime(hrstart)
			console.info('\nExecution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
		}
	}