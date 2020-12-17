module.exports  = function(input) {
	let Vector = function(x,y,z,w){this.x = x; this.y = y; this.z = z;this.w = w}
	let initState = [[input.reduce((out, line) => {
		out.push(line.split(''))
		return out;
	},[])]]
	let closeCubes = []
	for(var x = -1; x <= 1;  x++) {
		for(var y = -1; y <= 1;  y++) {
			for(var z = -1; z <= 1;  z++) {
				for(var w = -1; w <= 1;  w++) {
					if(x == 0 && y == 0 && z == 0 && w == 0) {continue;}
					closeCubes.push(new Vector(x,y,z,w))
				}
			}
		}
	}
	let padStatePlain = function(state) {
		let spaceXYSize = state[0][0].length;
		let tb = []
		
		for(var i = 0; i < spaceXYSize; i++) {tb.push('.');}
		state.forEach((wD) => {
			let plain1 = []
			let plain2 = []
			for(var i = 0; i < spaceXYSize; i++) {plain1.push([...tb]);plain2.push([...tb]);}
			
			wD.unshift(plain1)
			wD.push(plain2)
		})
	}
	let padStateRows = function(state) {
		let spaceXYSize = state[0][0].length,tb = [];
		for(var i = 0; i < spaceXYSize+2; i++) {tb.push('.');}
		state.forEach((wD) => {
			wD.forEach((plain) => {
				plain.forEach((row) => {
					row.unshift('.')
					row.push('.')
				})
				plain.unshift([...tb])
				plain.push([...tb])
			})
		})
	}
	let padWState = function(state) {
		let empty1 = dupStateEmpty(state),empty2 = dupStateEmpty(state)
		state.unshift(empty1);state.push(empty2)
	}
	let padState = function(state) {
		padStateRows(state);padStatePlain(state);padWState(state)
	}
	let dupState = function(state) {
		return JSON.parse(JSON.stringify(state))
	}
	let dupStateEmpty = function(state) {
		let output = []
		state[0].forEach((plain) =>{
			let rows = []
			plain.forEach((rowC) =>{
				let row = []
				rowC.forEach((el) =>{
					row.push('.')
				})
				rows.push(row)
			})
			output.push(rows)
		})
		
		return output;
	}
	let printState = function(state) {
		console.log("------------------------------------")
		state.forEach((wD) => {wD.forEach((plain) => {plain.forEach((row) =>{console.log(row.join(''))});console.log("\n");})})
	}
	let checkCloseCubes = function(state, w,x,y,z) {
		let count = 0;
		closeCubes.forEach((vector) => {
			try {
				if(state[w+vector.w][z+vector.z][y+vector.y][x+vector.x] == '#'){count++;}
			}catch(e){}
		})
		return count;
	}
	let step = function(state){
		let newState = dupState(state)
		let tempState = dupState(newState)
		tempState.forEach((wD,w) => {
			wD.forEach((plain,z) => {
				plain.forEach((row,y) => {
					row.forEach((stateChar,x) => {
						let cubeCount = checkCloseCubes(tempState,w,x,y,z);
						if(stateChar == '#' && !(cubeCount == 2 || cubeCount == 3)) {newState[w][z][y][x]='.'}
						else if(stateChar == '.' && cubeCount == 3) {newState[w][z][y][x]='#'}
					})
				})
			})
		})
		//printState(newState)
		return newState;
	}
	let state1 = initState
	for(var i = 0; i < 6; i ++) {
		padState(state1)
		state1 = step(state1)
	}
	let count = 0;
	state1.forEach((w) => {
		w.forEach((plain,z) => {
				plain.forEach((row,y) => {
					row.forEach((state,x) => {
						if(state == '#'){count++}
					})
				})
		})
	})
	console.log("Part2: " + count)
}