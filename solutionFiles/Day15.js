module.exports  = function(input) {
	input = input[0].split(',')
	let instructionList = input.reduce((out, line, index) => {
		out.push(parseInt(line))
		return out
	},[])
	let run = function(input, length) {
		let spoken = new Map(),newlastSpoken,i = 0,lastSpoken = 0
		length = length-1
		while(i < input.length) {
			spoken.set(input[i]+ "", (i++)+1);
			lastSpoken = 0;
		}
		while(i < length) {
			

			if(!spoken.has(lastSpoken+ "")) {
				spoken.set(lastSpoken + "", (i++)+1);
				lastSpoken = 0;
			}
			else {
				newlastSpoken = (i+1) - spoken.get(lastSpoken+"");
				spoken.set(lastSpoken+ "", (i++)+1);
				lastSpoken = newlastSpoken;
			}
		}
		console.log(lastSpoken)
	}

	run([...input], 2020);
	run([...input], 30000000);
}