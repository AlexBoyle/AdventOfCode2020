module.exports  = function(input) {
	let parse = function(val) {
		let nums = val.match(/^\d+|\d+\b|\d+(?=\w)/g);
		return {
			"firstNum": nums[0],
			"secondNum": nums[1],
			"letter": val.match(/ .:/g)[0][1],
			"pass": val.match(/:.*/g)[0].substring(2)
		}
	}

	let isValid = function(obj) {
		var numOfchar = (obj.pass.match(new RegExp(obj.lett, "g") )|| []).length;
		if(numOfchar >= obj.loww && numOfchar <= obj.high) {
			return true;
		}
		return false;
	}

	let countValidPasswords = function(input) {
		let numValid = 0;
		for(var i = 0; i < input.length; i ++) {
			var obj = parse(input[i]);
			if(isValid(obj)) {
				numValid ++;
			}
		}
		return numValid
	}

	console.log(countValidPasswords(input))
}
