module.exports  = function(input) {
	let parse = function(input) {
		return input.reduce((out, line) => {
			let sp = line.split(' ')
			out.push({"ins": sp[0], 'num': parseInt(sp[1])})
			return out
		}, [])
	}
	let runGameboyDebugger = function(instructionSet, changeIndex) {
		let accumulator = 0;
		let instructionIndex = 0;
		let instructionVisit = new Set([])
		let runHealth = false;
		let badInstList = new Set([])
		while(!(instructionVisit.has(instructionIndex) || instructionIndex > instructionSet.length)) {
			if(instructionIndex == instructionSet.length) {
				runHealth = true;
				break;
			}
			instructionVisit.add(instructionIndex)
			let inst = instructionList[instructionIndex].ins
			if(changeIndex != null && changeIndex == instructionIndex) {
				if(inst == 'jmp')
					inst = 'nop'
				else if(inst == 'nop')
					inst = 'jmp'
			}
			switch(inst) {
				case 'acc':
					accumulator += instructionSet[instructionIndex].num
					instructionIndex ++;
					break;
				case 'jmp':
					badInstList.add(instructionIndex)
					instructionIndex += instructionSet[instructionIndex].num
					break;
				case 'nop':
					badInstList.add(instructionIndex)
					instructionIndex ++;
					break;
			}
		}
		return {"health": runHealth, "accumulator": accumulator, "possibleBadInstSet": [...badInstList]};
	}
	let instructionList = parse(input);
	let debugOutput = runGameboyDebugger(instructionList)
	console.log("Pt1: " + debugOutput.accumulator)
	let debugOutputFixAttempt = null;
	for(var i = 0; i < debugOutput.possibleBadInstSet.length; i ++) {
		if((debugOutputFixAttempt = runGameboyDebugger(instructionList, debugOutput.possibleBadInstSet[i])).health) {
			console.log("Pt2: " + debugOutputFixAttempt.accumulator);
			break;
		}
	}
}