module.exports  = function(input) {
	const EAST = 'E',NORTH = 'N',SOUTH = 'S',WEST = 'W';
	let turn1  = function(letter, num, current) {
		let out = current;
		if(letter == 'L') {
			for(var i = 0; i < (num/90)%4; i ++) {
				if(out == EAST) {out = NORTH} else if(out == NORTH) {out = WEST} else if(out == WEST) {out = SOUTH} else if(out == SOUTH) {out = EAST}
			}
		}
		else if(letter == 'R') {
			for(var i = 0; i < (num/90)%4; i ++) {
				if(out == EAST) {out = SOUTH} else if(out == SOUTH) {out = WEST} else if(out == WEST) {out = NORTH} else if(out == NORTH) {out = EAST}
			}
		}
		return out
	}
	let turn2  = function(letter, num,  waypoint) {
		let normal =  {"NS": waypoint.NS, "EW": waypoint.EW}
		if(letter == 'L') {for(var i = 0; i < (num/90)%4; i ++) {normal.NS*=-1;[normal.NS, normal.EW] = [normal.EW, normal.NS];}}
		else if(letter == 'R') {for(var i = 0; i < (num/90)%4; i ++) {normal.EW*=-1;[normal.NS, normal.EW] = [normal.EW, normal.NS];}}
		return normal
	}
	let part1 = function(instructions) {
		let dir = EAST, movement = {"NS": 0, "EW": 0}
		for(var i = 0; i < instructions.length; i ++) {
			let instruction = instructions[i]
			switch(instruction.inst) {
				case NORTH:
					movement.NS += instruction.num
					break;
				case SOUTH:
					movement.NS -= instruction.num
					break;
				case EAST: 
					movement.EW += instruction.num
					break;
				case WEST: 
					movement.EW -= instruction.num
					break;
				case 'L':
					dir = turn1('L', instruction.num, dir)
					break;
				case 'R':
					dir = turn1('R', instruction.num, dir)
					break;
				case 'F':
					switch(dir) {
						case 'N':
							movement.NS += instruction.num
							break;
						case 'S':
							movement.NS -= instruction.num
							break;
						case 'E': 
							movement.EW += instruction.num
							break;
						case 'W': 
							movement.EW -= instruction.num
							break;
					}
					break;
			}
		}
		console.log( "Pt1: " + (Math.abs(movement.NS) +  Math.abs(movement.EW)))
	}
	let part2 = function(instructions) {
		let waypoint = {"NS": 1, "EW": 10},movement= {"NS": 0, "EW": 0};
		for(var i = 0; i < instructions.length; i ++) {
			let instruction = instructions[i]
			switch(instruction.inst) {
				case 'N':
					waypoint.NS += instruction.num
					break;
				case 'S':
					waypoint.NS -= instruction.num
					break;
				case 'E': 
					waypoint.EW += instruction.num
					break;
				case 'W': 
					waypoint.EW -= instruction.num
					break;
				case 'L':
					waypoint = turn2('L', instruction.num, waypoint)
					break;
				case 'R':
					waypoint = turn2('R', instruction.num, waypoint)
					break;
				case 'F':
					for (var j = 0; j < instruction.num; j ++) {
						movement.NS += waypoint.NS
						movement.EW += waypoint.EW
					}
					break;
			}
		}
		console.log("Pt2: " + (Math.abs(movement.NS) +  Math.abs(movement.EW)))
	}
	
	instructions = input.reduce((out, line) => {
		let chara = line.match(/.{1}/)[0]
		let numb = line.match(/\d+/)[0]
		out.push({"inst": chara, "num": parseInt(numb)})
		return out;
	},[])
	part1(instructions)
	part2(instructions)
}