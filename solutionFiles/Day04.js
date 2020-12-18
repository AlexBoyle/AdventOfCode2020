module.exports  = function(input) {
	let parse =function(input) {
		var passI = 0;
		output = []
		for(var i = 0; i < input.length; i ++) {
			if(input[i] == '') {
				passI ++;
				continue;
			} else {
				if(output[passI] == null) {output[passI] = {};}
				var row = input[i].split(' ')
				for(var j = 0; j < row.length; j ++) {
					lineItem = row[j].split(':')
					output[passI][lineItem[0]] = lineItem[1];
				}
			}
		}
		return output
	}
	let rules = [
		{'key': 'byr', 'pattern':/^\d{4}$/g, 'lowBound': 1920, 'upperBound': 2002},
		{'key': 'iyr', 'pattern':/^\d{4}$/g, 'lowBound': 2010, 'upperBound': 2020},
		{'key': 'eyr', 'pattern':/^\d{4}$/g, 'lowBound': 2020, 'upperBound': 2030},
		{'key': 'hgt', 'pattern':/(^1([5-8]\d|9[0-3])cm$)|(^(59|6\d|7[0-6])in$)/g},
		{'key': 'hcl', 'pattern':/^#[\da-f]{6}$/g,},
		{'key': 'ecl', 'pattern':/^(amb|blu|brn|gry|grn|hzl|oth)$/g,},
		{'key': 'pid', 'pattern':/^\d{9}$/g,}
	]
	let validate1 = function(passport) {
		let rule;
		for(var i = 0; (rule = rules[i]) != null; i ++) {
			try {
				let value = passport[rule.key];
				if(value== null) {
					return  false;
				}
			} catch (e) {
				return false;
			}
		}
		return true;
	}
	let validate2 = function(passport) {
		let rule;
		for(var i = 0; (rule = rules[i]) != null; i ++) {
			try {
				let value = passport[rule.key].match(rule.pattern);
				if(!(value!= null && ((rule.upperBound && value <= rule.upperBound) || !rule.upperBound) && ((rule.lowBound && value >= rule.lowBound) || !rule.lowBound))) {
					return  false;
				}
			} catch (e) {
				return false;
			}
		}
		return true;
	}
	let passports = parse(input);
	let validCount = 0;
	passports.forEach((passport) => {if(validate1(passport)){validCount ++;}})
	console.log("Pt1: " + validCount)
	validCount = 0;
	passports.forEach((passport) => {if(validate2(passport)){validCount ++;}})
	console.log("Pt2: " + validCount)
}