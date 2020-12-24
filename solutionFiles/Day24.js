
module.exports  = function(input) {
	const BLACK = true;
	const WHITE = false;
	let Vector = function(x,y,z,w){this.x = x; this.y = y; this.z = z;this.w = w}
	let Tile = function(val, x, y){this.val = val; this.y = y; this.x = x;}
	let parse = function(input) {
		return [...input].reduce((out, line) => {
			let parsed = []
			while (line.length > 0){
				let match = line.match(/^((?:se|sw|nw|ne)|(?:w|e))/g)[0]
				parsed.push(match)
				line = line.split('')
				line.splice(0,match.length )
				line = line.join('')
			}
			out.push(parsed)
			return out;
		}, [])
	}
	let traverse = function(directions) {
		let pos = {'x':0, 'y':0}
		directions.forEach((direction) =>{
			switch(direction) {
				case 'e': 
					pos.x++
					break;
				case 'w':
					pos.x--;
					break;
				case 'ne':
					pos.y--
					pos.x++
					break;
				case 'nw':
					pos.y--
					break;
				case 'se':
					pos.y++
					break;
				case 'sw':
					pos.y++
					pos.x--
					break;
				
			}
		})
		return pos
	}
	let countTiles = function(tileMap) {
		let blackCount = 0
		let whiteCount = 0
		for (const [key, value] of tileMap.entries()) {
			if(value.val == BLACK) {
				blackCount++
			}
			else {
				whiteCount ++
			}
		}
		return [whiteCount, blackCount]
	}
	let closeTiles = [
		new Vector(-1,0),
		new Vector(-1,1),
		
		new Vector(0,-1),
		new Vector(0,1),
		
		new Vector(1,-1),
		new Vector(1,0),
	]
	let countCloseBlackTiles = function(tile, tileMap) {
		let count = 0;
		closeTiles.forEach((vector) => {
			try {
				let key = (tile.x+vector.x) + ":" + (tile.y+vector.y)
				if(tileMap.has(key) && tileMap.get(key).val == BLACK){count++;}
			}catch(e){}
		})
		return count;
	}
	let part1 = function(input) {
		let flipedTiles = new Map()
		input.forEach((directions) => {
			let pos = traverse(directions)
			let key = pos.x + ":" + pos.y
			if(flipedTiles.has(key)) {
				let tile = flipedTiles.get(key)
				tile.val = !tile.val
			}else {
				flipedTiles.set(key, new Tile(BLACK, pos.x,pos.y))
			}
		})
		let counts = countTiles(flipedTiles)
		
		console.log('Pt1: ' + counts[1])
		return flipedTiles
	}
	let updateTile = function(x,y,oldMap, tileMap) {
		let key = x + ":" + y;
		let tile;
		let tag = "old "
		let count
		if(!oldMap.has(key)) {
			
			tile = new Tile(WHITE,x,y)
			count = countCloseBlackTiles(tile, oldMap)
			if(count == 2) {
				tileMap.set(key,  tile)
			}else {return}
			tag = "new "
		} else {
			tile = tileMap.get(key)
			count = countCloseBlackTiles(tile, oldMap)
		}
		if(tile.val == BLACK && count != 1 && count != 2) {
			tile.val = WHITE;
			return;
		}
		if(tile.val == WHITE && (count == 2)) {
			tile.val = BLACK;
			return;
		}
		
	}
	let getTileKey = function(tile,x=0,y=0) {
		return (tile.x+x) + ":" + (tile.y+y)
	}
	let dupMap = function(map) {
		let newMap = new Map()
		for (const [key, value] of map.entries()) { 
			newMap.set(key,new Tile(value.val, value.x,value.y))
		}
		return newMap
	}
	let part2 = function(initPos, num) {
		let oldTileMap = dupMap(initPos)
		let tileMap
		for(var i = 0; i < num; i ++) {
			let lX=0,sX=0,lY=0;sY=0;
			tileMap = dupMap(oldTileMap)
			let updated = new Set();
			for (const [key, value] of oldTileMap.entries()) {
				let key = getTileKey(value)
				if(!updated.has(key)){updated.add(key);updateTile(value.x,value.y,oldTileMap, tileMap)};
				if(value.x > lX)(lX = value.x);if(value.y > lY)(lY = value.y);if(value.x < sX)(sX = value.x);if(value.y < sY)(sY = value.y);
				if(true) {
					closeTiles.forEach((vector) => {
						key = (value.x+vector.x) + ":" + (value.y+vector.y)
						if((value.x+vector.x) > lX)(lX = (value.x+vector.x));if((value.y+vector.y) > lY)(lY = (value.y+vector.y));if((value.x+vector.x) < sX)(sX =(value.x+vector.x));if((value.y+vector.y) < sY)(sY = (value.y+vector.y));
						if(!updated.has(key)){updated.add(key);updateTile(value.x+vector.x,value.y+vector.y,oldTileMap, tileMap)}
					})
				}
			}
			oldTileMap = dupMap(tileMap)
		}
		return countTiles(tileMap)[1]
	}
	let parseddata = parse(input)
	let initPos = part1(parseddata)
	console.log('Pt2: ' + part2(initPos, 100))
}