module.exports  = function(input) {
	input = input[0].split(',')
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
		return lastSpoken
	}

	console.log('pt1: ' + run([...input], 2020));
	console.log('pt2: ' + run([...input], 30000000));
}