module.exports  = function(input) {
	let getSeatAt = function(y,x,board) {
		try{return board[y][x]} catch(e){return undefined}
	}
	let getseatFilledCountAt = function (y,x,board, vision = false) {
		let count = 0;
		[0,1,2,3,5,6,7,8].forEach((i)=> {
			let dist = 1, xN = (i%3)-1, yN = Math.floor(i/3)-1;
			while (vision && getSeatAt(y+(dist*yN),x+(dist*xN),board) == '.'){dist++}
			if(getSeatAt(y+(dist*yN),x+(dist*xN),board) == '#'){count++}
		})
		return count;
	}
	let getIndexOfSeats = function(board) {
		let out = [];
		for(var y =0; y < board.length; y ++) {
			for(var x =0; x < board[y].length; x ++) {
				if(board[y][x] != '.')
					out.push([y,x])
			}
		}
		return out;
	}
	let getNextBoardState = function(board, seats, tolorance = 4,  vision = false) {
		let wasChanged = false;
		let nextBoard = board.reduce((out, line) => {out.push([...line]);return out;},[])
		for(var i = 0; i < seats.length; i++) {
			if(getSeatAt(seats[i][0],seats[i][1], board) == 'L' && getseatFilledCountAt(seats[i][0],seats[i][1], board, vision) == 0) {
				wasChanged = true;
				nextBoard[seats[i][0]][seats[i][1]] = '#';
			}
			else if(getSeatAt(seats[i][0],seats[i][1], board) == '#' && getseatFilledCountAt(seats[i][0],seats[i][1], board, vision) >= tolorance) {
				wasChanged = true;
				nextBoard[seats[i][0]][seats[i][1]] = 'L';
			}
		}
		return {"board": nextBoard, "wasChanged": wasChanged};
	}
	let runSim = function(board,tolorance = 4, vision = false) {
		let seats = getIndexOfSeats(board);
		let boardState = getNextBoardState(board, seats, tolorance, vision);
		while(boardState.wasChanged) {
			boardState = getNextBoardState(boardState.board, seats, tolorance, vision)
		}
		return boardState
	}
	let countSeats = function(board, seats) {
		let count = 0;
		for(var i = 0; i < seats.length; i++) {
			if(board[seats[i][0]][seats[i][1]] ==  '#')
				count++
		}
		return count
	}

	initBoard = input.reduce((out, line) => {
		out.push(line.split(''))
		return out;
	},[])
	let seats = getIndexOfSeats(initBoard);
	console.log("Pt1: " + countSeats(runSim(initBoard, 4,false).board,seats))
	console.log("Pt2: " + countSeats(runSim(initBoard, 5,true).board,seats))
}