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

	let isValid1 = function(obj) {
		var numOfchar = (obj.pass.match(new RegExp(obj.letter, "g") )|| []).length;
		if(numOfchar >= obj.firstNum && numOfchar <= obj.secondNum)
			return true;
		return false;
	}

	let isValid2 = function(obj) {
		if(
			obj.pass[obj.firstNum-1] == obj.letter && obj.pass[obj.secondNum-1] != obj.letter ||
			obj.pass[obj.secondNum-1] == obj.letter && obj.pass[obj.firstNum-1] != obj.letter
		) {
			return true
		}
		return false
	}
	
	let countValidPasswords = function(input, validation) {
		let numValid1 = 0;
		for(var i = 0; i < input.length; i ++) {
			var obj = parse(input[i]);
			if(validation(obj)) {
				numValid1 ++;
			}
		}
		return numValid1
	}

	console.log("Part1: " + countValidPasswords(input, isValid1))
	console.log("Part2: " + countValidPasswords(input, isValid2))
}