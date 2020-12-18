module.exports  = function(input) {
	let speedArr = [{"x": 1, "y": 1},{"x": 3, "y": 1},{"x": 5, "y": 1},{"x": 7, "y": 1},{"x": 1, "y": 2}]
	let move = function(loc, spe) {loc.x += spe.x;loc.y += spe.y;}
	let check = function(loc, input) {try{return input[loc.y][loc.x%31];}catch(e){return null;}}
	let mTreeTotal = 1;
	let getTreesHit = function(map, speed) {
		let treeCount = 0
		let loc = {"x": 0, "y": 0}
		let currentCharAtLoc = check(loc, map);
		try{
			while(currentCharAtLoc != null) {
				move(loc, speed)
				currentCharAtLoc = check(loc, map);
				if(currentCharAtLoc == '#') {
					treeCount ++
				}
			}
		}catch(e){}
		return treeCount;
	}
	speedArr.forEach(speed => {
		mTreeTotal *= getTreesHit(input, speed)
	})
	console.log("Pt1: " + getTreesHit(input, {"x": 3, "y": 1}))
	console.log("Pt2: " + mTreeTotal)
}