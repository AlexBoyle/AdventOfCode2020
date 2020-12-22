let Utility = function() {
	this.toArray = function(str) {
		if(typeof str == 'string')
			return str.split('');
		else 
			return str;
	}
	this.union = function(...sets) {
		let union = [];
		sets.forEach(set => {
			union = new Set([...union, ...set])
		})
		return union
	}
	this.intersect = function(...sets) {
		return sets.reduce((a, b) => {a = this.toArray(a); b = this.toArray(b); return a.filter(c => b.includes(c))});
	}
	this.replaceAll = function(str, reg, repalcement) {
		let re = new RegExp(reg,"g");
		return this.replace(new RegExp(reg,"g"), repalcement);
	}
	this.timeFunction = function(func, input) {
		let start = new Date()
		let hrstart = process.hrtime()
		let simulateTime = 5
		let hrend;
		console.log('')
		func(...input)
		hrend = process.hrtime(hrstart)
		console.info('\nExecution time: ' + (hrend[0] > 0? hrend[0] + 's':'') + '%dms', hrend[1] / 1000000)
	}
	this.arr = {
		"getSub": function(arr,size, indexStart) {
			let out = []
			for(var i = indexStart; i < indexStart + size; i ++)
				out.push(arr[i])
			return out;
		},
		"getSum": function (arr) {
			let sum = 0;
			for(var i = 0; i < arr.length; i ++) {
				sum += arr[i];
			}
			return sum
		}
	}
}
if(global.utility == null)
	global.utility = new Utility();
module.exports = global.utility
