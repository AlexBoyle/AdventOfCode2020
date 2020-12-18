module.exports  = function(input) {
	let parse = function(input) {
		let output = []
		for(var i = 0; i < input.length-1; i ++) {
			let rowNum = parseInt(input[i].substring(0,7).replace(/F/g, 0).replace(/B/g, 1), 2)
			let seatNum = parseInt(input[i].substring(7).replace(/L/g, 0).replace(/R/g, 1), 2)
			output.push(rowNum * 8 + seatNum)
		}
		return output
	}
	var seatIds = parse(input).sort((a,b)=> a-b);
	console.log("Pt1: " + seatIds[seatIds.length-1])
	for (var i = seatIds[0]; i < seatIds[seatIds.length-1]; i ++) {
		if(!seatIds.includes(i)) {
			console.log("Pt2: " + i);
			break;
		}
	}
}