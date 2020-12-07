module.exports  = function(input) {
	var part1 = function() {
		for (var i = 0; i < input.length-2;  i ++) {
			for (var j = i; j < input.length-1;  j ++) {
					if(parseInt(input[i]) + parseInt(input[j]) == 2020)
						return parseInt(input[i]) * parseInt(input[j]);
			}
		}
	}
	var part2 = function() {
		for (var i = 0; i < input.length-2;  i ++) {
			for (var j = i; j < input.length-1;  j ++) {
				for (var k = j; k < input.length;  k ++) {
					if(parseInt(input[i]) + parseInt(input[j]) + parseInt(input[k]) == 2020)
						return parseInt(input[i]) * parseInt(input[j]) * parseInt(input[k]);
				}
			}
		}
	}
	console.log("Part1: " + part1());
	console.log("Part2: " + part2());
}