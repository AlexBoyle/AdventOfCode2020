module.exports  = function(input) {
let group =function(input) {
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
let print = function(reason, passport) {
		console.log( "Reason=" + reason +   "            byr: " + passport['byr'] + " iyr:"+ passport['iyr'] + " eyr:"+ passport['eyr'] +" hgt:"+ passport['hgt'] + " hcl:"+ passport['hcl'] + " ecl:"+ passport['ecl'] + " pid:"+ passport['pid'])
	}
	let validate = function(passport) {
		if(!(passport['byr'] != null && passport['byr'].length == 4 && passport['byr'] >= 1920 && passport['byr'] <= 2002)){print('byr',passport);return false;}
		else if(!(passport['iyr'] != null && passport['iyr'].length == 4 && passport['iyr'] >= 2010 && passport['iyr'] <= 2020)){print('iyr',passport);return false;}
		else if(!(passport['eyr'] != null && passport['eyr'].length == 4 && passport['eyr'] >= 2020 && passport['eyr'] <= 2030)){print('eyr',passport);return false;}
		else if(!(passport['hgt'] != null && ((passport['hgt'].includes('cm') && passport['hgt'].substr(0,3) >= 150 && passport['hgt'].substr(0,3)<=193) || (passport['hgt'].includes('in') && passport['hgt'].substr(0,2) >=59 && passport['hgt'].substr(0,2) <=76)))){print('hgt',passport);return false;}
		else if(!(passport['hcl'] != null && passport['hcl'].length == 7 && passport['hcl'].match(/#[0-9,a-f]{6}/g) != null  && passport['hcl'].match(/#[0-9,a-f]{6}/g).length == 1)){print('hcl',passport);return false;}
		else if(!(passport['ecl'] != null && passport['ecl'].length == 3 && (passport['ecl'] == 'amb' || passport['ecl'] == 'blu' || passport['ecl'] == 'brn' || passport['ecl'] == 'gry' || passport['ecl'] == 'grn' || passport['ecl'] == 'hzl' || passport['ecl'] == 'oth'))){print('ecl',passport);return false;}
		else if(!(passport['pid'] != null && passport['pid'].length == 9 && passport['pid'].match(/[0-9]{9}/g)!= null && passport['pid'].match(/[0-9]{9}/g).length == 1)){print('pid',passport);return false;}
		return true;
	}

	let passports = group(input);
	let validCount = 0;
	let invalid = 0;
	passports.forEach((passport) => {
		if(validate(passport)) {
			validCount ++;
		}
		else {
			invalid ++;
		}
	})
	
	console.log("ValidCount=" + validCount)
	console.log("InvalidCount=" + invalid)
	console.log("TotalCount=" + validCount + invalid)
}