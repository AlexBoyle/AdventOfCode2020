module.exports  = function(input) {
	input = input[0].split(',')
	let instructionList = input.reduce((out, line, index) => {
		out.push(parseInt(line))
		return out
	},[])
	let run = function(input, length) {
		let spoken = [],newlastSpoken,i = 0,lastSpoken = 0
		length = length-1
		while(i < input.length) {
			if(spoken[input[i]] == null) {
				spoken[input[i]] =  (i++)+1;
				lastSpoken = 0;
			}
		}
		while(i < length) {
				newlastSpoken =  spoken[lastSpoken] == null ? 0 : (i+1) - spoken[lastSpoken];
				spoken[lastSpoken] = (i++)+1;
				lastSpoken = newlastSpoken;
		}
		console.log(lastSpoken)
	}
	run([...input], 2020);
	run([...input], 2000000//30000000);
}