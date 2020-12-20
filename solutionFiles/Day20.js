module.exports  = function(input) {
	console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
	let arrEql = function (a, b) {
		let rA = [...a].reverse()
		let rB = [...b].reverse()
		return arrayEquals(a,rB) //|| arrayEquals(a,rB) || arrayEquals(rA,b) || arrayEquals(rA,rB)
	}
	let didRotate = false;
	let roateImage = function(map) {
		return map.map((val, index) => map.map(row => row[index]).reverse())
	}
	
	let arrayEquals = function (a, b) {
		return Array.isArray(a) &&
			Array.isArray(b) &&
			a.length === b.length &&
			a.every((val, index) => val === b[index]);
	}
	let Image = function(id, map = [], trimedMap = [], orientation = false,edges = {"u": [], "d": [], "l": [], 'r': {}}, edgeMatches ={"u": 0, "d": 0, "l": 0, 'r': 0}) {this.trimedMap = trimedMap;this.id = id; this.map = map; this.edges = edges; this.edgeMatches = edgeMatches;this.edgeMatches.s=id;}
	let parseInput = function(input) {
		let images = []
		let reset = true;
		for(var i = 0; i < input.length; i ++) {
			if(reset) {
				images.unshift(new Image(input[i].match(/\d+/)[0]))
				reset = false;
			}
			else if(input[i] == ''){reset = true;mapAllEdges(images[0]);images[0].trimedMap.pop();images[0].trimedMap.shift();}
			else {
				images[0].map.push([...input[i]])
				let trim = [...input[i]]
				trim.shift()
				trim.pop()
				images[0].trimedMap.push(trim)
			}
		}
		images[0].trimedMap.pop();images[0].trimedMap.shift();
		mapAllEdges(images[0])
		return images
	}
	let mapAllEdges = function(image) {
		let left = []
		let right = []
		image.map.forEach((line) => {
			left.unshift(line[0])
			right.push(line[line.length-1])
		})
		image.edges.u = [...image.map[0]]
		image.edges.r = right
		image.edges.d = [...image.map[image.map.length-1]].reverse()
		image.edges.l = left
		
	}
	let getImage = function(id, images) {
		for(var i = 0; i < images.length; i ++) {
			if(id == images[i].id) {
				return images[i]
			}
		}
	}
	let images = parseInput(input);
	let stack = 0;
	let rotate = function(image, num, callList = []) {
		didRotate = true;
		//console.log("Rotate: " + image.id + " by " + num)
		if(callList.length == 0) {
			
			callList.push(image.id)
		}
		//console.log(image.edgeMatches)
		if(image.edgeMatches.u!=0 && !callList.includes(image.edgeMatches.u)){callList.push(image.edgeMatches.u);callList = rotate(getImage(image.edgeMatches.u,images),num, callList)}
		if(image.edgeMatches.d!=0 && !callList.includes(image.edgeMatches.d)){callList.push(image.edgeMatches.d);callList = rotate(getImage(image.edgeMatches.d,images),num, callList)}
		if(image.edgeMatches.l!=0 && !callList.includes(image.edgeMatches.l)){callList.push(image.edgeMatches.l);callList = rotate(getImage(image.edgeMatches.l,images),num, callList)}
		if(image.edgeMatches.r!=0 && !callList.includes(image.edgeMatches.r)){callList.push(image.edgeMatches.r);callList = rotate(getImage(image.edgeMatches.r,images),num, callList)}
		
		for(var i = 0; i < num; i ++) {
			
			image.map = roateImage(image.map)
			image.trimedMap = roateImage(image.trimedMap)
			let temp = image.edges.u;
			image.edges.u =  image.edges.l
			image.edges.l =  image.edges.d
			image.edges.d =  image.edges.r
			image.edges.r =  temp
			
			temp = image.edgeMatches.u;
			image.edgeMatches.u =  image.edgeMatches.l
			image.edgeMatches.l =  image.edgeMatches.d
			image.edgeMatches.d =  image.edgeMatches.r
			image.edgeMatches.r =  temp
		}
		return callList
	}
	let flipImage = function(image,callList = []) {
		//console.log("flipImage: " + image.id)
		if(callList.length == 0) {
			
			callList.push(image.id)
		}
		//console.log(image.edgeMatches)
		if(image.edgeMatches.u!=0 && !callList.includes(image.edgeMatches.u)){callList.push(image.edgeMatches.u);callList = flipImage(getImage(image.edgeMatches.u,images), callList)}
		if(image.edgeMatches.d!=0 && !callList.includes(image.edgeMatches.d)){callList.push(image.edgeMatches.d);callList = flipImage(getImage(image.edgeMatches.d,images), callList)}
		if(image.edgeMatches.l!=0 && !callList.includes(image.edgeMatches.l)){callList.push(image.edgeMatches.l);callList = flipImage(getImage(image.edgeMatches.l,images), callList)}
		if(image.edgeMatches.r!=0 && !callList.includes(image.edgeMatches.r)){callList.push(image.edgeMatches.r);callList = flipImage(getImage(image.edgeMatches.r,images), callList)}
			
			image.map = image.map.reduce((out, line) =>{
				out.unshift(line)
				return out;
			},[])
			image.trimedMap =image.trimedMap.reduce((out, line)=> {
				out.unshift(line)
				return out;
			},[])
			let temp = image.edges.u;
			image.edges.u =  image.edges.d.reverse()
			image.edges.d =  temp.reverse()
			image.edges.r =  image.edges.r.reverse()
			image.edges.l =  image.edges.l.reverse()
			
			temp = image.edgeMatches.u;
			image.edgeMatches.u =  image.edgeMatches.d
			image.edgeMatches.d =  temp
		return callList
	}
	let compareImages = function(image1, image2) {
		//console.log("cpmapring to " + image2.id)
		let minRot = 4;
			 if(arrEql(image1.edges.u, image2.edges.r)) {if(minRot > 1){minRot = 1}; }//console.log('ur')}
		else if(arrEql(image1.edges.u, image2.edges.u)) {if(minRot > 2){minRot = 2}; }//console.log('uu') }
		else if(arrEql(image1.edges.u, image2.edges.l)) {if(minRot > 3){minRot = 3}; }//console.log('ul') }
		else if(arrEql(image1.edges.u, image2.edges.d)) {if(minRot > 0){minRot = 0}; }//console.log('ud') }

		else if(arrEql(image1.edges.d, image2.edges.r)) {if(minRot > 3){minRot = 3}; }//console.log('dr') }
		else if(arrEql(image1.edges.d, image2.edges.d)) {if(minRot > 2){minRot = 2}; }//console.log('dd') }
		else if(arrEql(image1.edges.d, image2.edges.l)) {if(minRot > 1){minRot = 1}; }//console.log('dl') }
		else if(arrEql(image1.edges.d, image2.edges.u)) {if(minRot > 0){minRot = 0}; }//console.log('du') }

		else if(arrEql(image1.edges.r, image2.edges.d)) {if(minRot > 1){minRot = 1}; }//console.log('rd') }
		else if(arrEql(image1.edges.r, image2.edges.r)) {if(minRot > 2){minRot = 2}; }//console.log('rr') }
		else if(arrEql(image1.edges.r, image2.edges.u)) {if(minRot > 3){minRot = 3}; }//console.log('ru') }
		else if(arrEql(image1.edges.r, image2.edges.l)) {if(minRot > 0){minRot = 0}; }//console.log('rl') }

		else if(arrEql(image1.edges.l, image2.edges.d)) {if(minRot > 3){minRot = 3}; }//console.log('ld') }
		else if(arrEql(image1.edges.l, image2.edges.l)) {if(minRot > 2){minRot = 2}; }//console.log('ll') }
		else if(arrEql(image1.edges.l, image2.edges.u)) {if(minRot > 1){minRot = 1}; }//console.log('lu') }
		else if(arrEql(image1.edges.l, image2.edges.r)) {if(minRot > 0){minRot = 0}; }//console.log('lr') }
		if(minRot != 4) {
			if(minRot != 0 ) {
				//console.log("minRot: " + minRot)
				rotate(image2,minRot);
			}


				 if(arrEql(image1.edges.u, image2.edges.d)) {(image1.edgeMatches.u = (image2.id));(image2.edgeMatches.d = (image1.id));return true;}
			else if(arrEql(image1.edges.r, image2.edges.l)) {(image1.edgeMatches.r = (image2.id));(image2.edgeMatches.l = (image1.id));return true}
			else if(arrEql(image1.edges.d, image2.edges.u)) {(image1.edgeMatches.d = (image2.id));(image2.edgeMatches.u = (image1.id));return true;}
			else if(arrEql(image1.edges.l, image2.edges.r)) {(image1.edgeMatches.l = (image2.id));(image2.edgeMatches.r = (image1.id));return true}
			return false
		}
	}
	
	let findEdgeMatches = function(images) {
		let queue = [images[0].id]
		let processed = []
		for(var i = 0; queue[i] != null; i ++) {
			processed.push(queue[i])
			console.log("___ID: " + queue[i] + "__________________________________")
			let numSet = 0;
			let image1 = getImage(queue[i],images)
			for(var j = 0; j < images.length; j ++) {
				if(image1.id !=  images[j].id && !processed.includes(images[j].id)){
					if(!compareImages(image1, images[j])) {
						flipImage(images[j]);compareImages(image1, images[j]);flipImage(images[j]);
					}
				}
			}
			if(image1.edgeMatches.l !=0 && !queue.includes(image1.edgeMatches.l)){queue.push(image1.edgeMatches.l)}
			if(image1.edgeMatches.d !=0 && !queue.includes(image1.edgeMatches.d)){queue.push(image1.edgeMatches.d)}
			if(image1.edgeMatches.u !=0 && !queue.includes(image1.edgeMatches.u)){queue.push(image1.edgeMatches.u)}
			if(image1.edgeMatches.r !=0 && !queue.includes(image1.edgeMatches.r)){queue.push(image1.edgeMatches.r)}
			
			
		}
	}
	let getRightImage = function(image, images) {
		if(image.edgeMatches.r == 0) {return null;}
		for(var i = 0; i < images.length; i ++) {
			if(images[i].id == image.edgeMatches.r) {
				return images[i]
			}
		}
	}
	let getBottomImage = function(image, images) {
		if(image.edgeMatches.d == 0) {return null;}
		for(var i = 0; i < images.length; i ++) {
			if(images[i].id == image.edgeMatches.d) {
				return images[i]
			}
		}
	}
	let compileImage = function(images) {
		let drEdge = null
		for(var i = 0; i < images.length; i ++) {
			if(images[i].edgeMatches.u == 0 && images[i].edgeMatches.l == 0 && images[i].edgeMatches.d != 0 && images[i].edgeMatches.r != 0) {
				drEdge = images[i]
				break;
			}
		}
		//console.log(drEdge.edgeMatches)
		let nextBottom = drEdge
		let nextRight;
		let fullImage = []
		let j = 0;
		do {
			
			nextRight = nextBottom
			fullImage.push([])
			//console.log("image row: " + j)
			do {
				//console.log(nextRight.id)
				//console.log(nextRight.trimedMap)
				for(var i = 0; i < nextRight.trimedMap.length; i ++) {
					
					if(fullImage[j][i] == null){fullImage[j].push([])}
					fullImage[j][i] = [...fullImage[j][i], ...nextRight.trimedMap[i]]
				}
			} while((nextRight = getRightImage(nextRight, images))!= null);
			j++
		} while((nextBottom = getBottomImage(nextBottom, images))!= null);
		//console.log(fullImage)
		fullImage = fullImage.reduce((out, line) => {
			out = [...out, ...line]
			return out;
		}, [])

		return fullImage;
	}
	
	let checkMonst = function(map, monster,x,y) {
		
		let isMonst = true;
		for(var i = 0; i < monster[0].length && isMonst; i++) {
			for(var j = 0; j < monster.length && isMonst; j++) {
				
				if(!(monster[j][i] == ' ' || (monster[j][i] == '#' && monster[j][i] == map[y+j][x+i]))) {
					isMonst = false
				}
			}
		}
		return isMonst;
	}
	let findMonsters = function(map, monster) {
		let mapX = map[0].length
		let mapy = map.length
		let monstx = monster[0].length
		let monsty = monster.length
		let monstCount = 0;
		for(var i = 0; i < mapX - monstx;i++) {
			for(var j = 0; j < mapy - monsty;j++) {
				if(checkMonst(map, monster, i,j)) {
					monstCount++
					for(var k = 0; k < monstx;k++) {
						for(var l = 0; l < monsty;l++) {
							if(monster[l][k] == '#') {
								map[j+l][i+k] = '0'
							}
						}
					}
				}
			}
		}
		return monstCount;
	}
	
	let part1 = function(images) {
		findEdgeMatches(images)
		let sum1 = 0
		let sum2 = 0
		let sum3 = 0
		let sum4 = 0
		let sum0 = 0
		let sumo = 0
		let sum = 1
		//console.log("")
		//console.log("PART ! ~~~~~~~~~~~~~~~")
		
		for(var i = 0; i < images.length; i ++) {

			//console.log(images[i].edgeMatches)
			let matEdg = 0;
			if(images[i].edgeMatches.u!= 0) {matEdg++}
			if(images[i].edgeMatches.d!= 0) {matEdg++}
			if(images[i].edgeMatches.l!= 0) {matEdg++}
			if(images[i].edgeMatches.r!= 0) {matEdg++}
			
			if(matEdg == 1){sum1++}
			else if(matEdg == 2){sum *= parseInt(images[i].id);sum2++;}
			else if(matEdg == 3){sum3++}
			else if(matEdg == 4){sum4++}
			else if(matEdg == 0){sum0++}
			else {sumo++}
		}
		//console.log([sum0, sum1, sum2, sum3, sum4, sum0])
		return sum
	}
	
	
	let part2 = function(images) {
		let fullImage = compileImage(images);
		//console.log("fullMap y: " + fullImage.length)
		//console.log("fullMap x: " + fullImage[0].length)
		let monster = ["                  # ".split(''),
					   "#    ##    ##    ###".split(''),
					   " #  #  #  #  #  #   ".split(''),
		]
		
		
		findMonsters(fullImage, monster)
		fullImage = roateImage(fullImage)
		findMonsters(fullImage, monster)
		fullImage = roateImage(fullImage)
		findMonsters(fullImage, monster)
		fullImage = roateImage(fullImage)
		findMonsters(fullImage, monster)
		//fullImage.map((line) =>{console.log(line.join(''))})
		
		let waveCount = 0;
		for(var i = 0; i < fullImage.length; i ++) {
			for(var j = 0; j < fullImage.length; j ++) {
				if(fullImage[i][j] == '#')
					waveCount++
			}
		}
		return waveCount
		
	}
	
	
	
	
	
	
	console.log('Pt1: ' + part1(images))
	console.log("\n\n")
	console.log('Pt2: ' + part2(images))
}