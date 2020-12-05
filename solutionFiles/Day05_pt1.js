module.exports  = function(input) {
	let parse =function(input) {
		let output = []
		for(var i = 0; i < input.length-1; i ++) {
			
			let rowNum = input[i].substring(0,7);
			let seatNum = input[i].substring(7);
			
			rowNum = rowNum.replace(/F/g, 0)
			rowNum = rowNum.replace(/B/g, 1)

			seatNum = seatNum.replace(/L/g, 0)
			seatNum = seatNum.replace(/R/g, 1)

			rowNum = parseInt(rowNum, 2)
			seatNum = parseInt(seatNum, 2)

			output.push(rowNum * 8 + seatNum)
		}
		return output
	}
	
	var parsedInput = parse(input).sort((a,b)=> a-b);
	console.log("The largetst seat Id is " + parsedInput[parsedInput.length-1])
	console.log("")

	var wasLastIncluded = true;
	for (var i = parsedInput[0]; i < parsedInput[parsedInput.length-1]; i ++) {
		if(!parsedInput.includes(i)) {
			console.log("Your seat id is " + i);
			break;
		}
	}


}