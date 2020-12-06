module.exports  = function(input) {
	function removeDuplicateCharacters(string) {
		return string.split('').filter(function(item, pos, self) {return self.indexOf(item) == pos;}).join('');
	}
	
	let parse = function(input) {
		var index = -1;
		output = []
		for(var i = -1; i < input.length; i ++) {
			if(input[i] == '' || input[i] == null) {
				index ++;
				 i ++
				output[index] = input[i];
				continue;
			} else {
				output[index] += " " + input[i];
			}
		}
		return output
	}
	
	let parsedInput = (parse(input));
	let total1 = 0;
	for(var i = 0; i < parsedInput.length; i ++) {total1 += removeDuplicateCharacters(parsedInput[i].replace(/\s/g, "")).length;}
	console.log("The total number of unique \"yes\": " + total1)
	
	let total = 0;
	for(var i = 0; i < parsedInput.length; i ++) {
		let group = parsedInput[i].split(" ")
		let letters = removeDuplicateCharacters(parsedInput[i].replace(/\s/g, ""));
		let count = 0;
		for(var k = 0; k < letters.length; k++) {
			let isInAll = true;
			for(var j = 0; j < group.length; j ++) {
				if(!group[j].includes(letters[k])) {
					isInAll = false;
				}
			}
			if(isInAll) {
				count++
			}
		}
		total += count;
	}
	console.log("The total number of unique \"yes\" in group: " + total);

	
}