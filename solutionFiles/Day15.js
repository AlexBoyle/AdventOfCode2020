module.exports  = function(input) {
	input = input[0].split(',')
	let instructionList = input.reduce((out, line, index) => {
		out.push(parseInt(line))
		return out
	},[])
	let part1 = function(input) {
		let spoken = {}
		var i = 0
		let lastSpoken = 0
		for(; i < input.length; i ++) {
			if(spoken[input[i]] == null) {
				spoken[input[i]] =  i+1;
				lastSpoken = 0;
			}
		}
		let newlastSpoken
		for(; i < 30000000; i ++) {
			if(i > 29999990)
				console.log(lastSpoken)
			if(i%1000000 == 0)
				console.log(i)
			if(spoken[lastSpoken] == null) {
				spoken[lastSpoken] = i+1;
				lastSpoken = 0;
			}
			else {
				newlastSpoken =  (i+1) - spoken[lastSpoken];
				spoken[lastSpoken] = i+1
				lastSpoken = newlastSpoken;
			}
			
		}
		
	}
	part1([...input]);
}