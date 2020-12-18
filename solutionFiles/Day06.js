module.exports  = function(input) {
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
	for(var i = 0; i < parsedInput.length; i ++) {total1 += utility.union(...parsedInput[i].replace(/\s/g, "")).size;}
	console.log("Pt1: " + total1)
	let total2 = 0;
	for(var i = 0; i < parsedInput.length; i ++) {total2 += utility.intersect(...parsedInput[i].split(" ")).length;}
	console.log("Pt2 " + total2);
}