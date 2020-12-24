module.exports  = function(input) {
	let parse = function(input) {
		return input[0].split('').reduce((out, line) => {
			out.push(parseInt(line))
			return out;
		}, [])
	}
	let Link = function(num){this.num = num;this.next = null; this.prev = null;}
	let toLinkedList = function(arr) {
		let map = new Map()
		let first = new Link(arr[0])
		map.set(arr[0],first)
		let prev = first
		let next;
		for(var i = 1; i < arr.length; i ++) {
			next = new Link(arr[i])
			map.set(arr[i],next)
			next.prev = prev;
			prev.next = next;
			prev = next;
		}
		first.prev = next;
		next.next = first;
		return [{'selectedNum': first},map]
	}
	let cutCups = function(cupList, index, num) {
		let out = []
		let indexmod = 0;
		if(index+2 >= cupList.length ){
			for(var i = 0; i < num; i++ ){
				if((index)%cupList.length == 0)
					index=0
				out.push(cupList.splice((index+indexmod)%cupList.length,1)[0])
			}
		}
		else {
		out = cupList.splice(index,3)
		}
		return out
	}
	let cutCups1 = function(cup) {
			let cutStart = cup.next;
			let cutLast = cup.next.next.next;
			
			cup.next = cup.next.next.next.next;
			cutLast.next.prev = cup
			
			cutLast.next = null
			cutStart.prev = null;
			
			return [cutStart,cutLast]

		return out
	}
	let printArr = function(arr) {
		let str = "["
		try {
		let tempCup = arr.prev;while((tempCup = tempCup.next) != arr.prev && tempCup != null){str += tempCup.num + " "}str += tempCup.num + " "
		} catch(e){console.log('print Failed')}
		console.log(str)
	}
	let printArrB = function(arr) {
		let str = "["
		try {
		let tempCup = arr.next;while((tempCup = tempCup.prev) != arr.next && tempCup != null){str += tempCup.num + " "}str += tempCup.num + " "
		} catch(e){console.log('print Failed')}
		console.log(str)
	}
	let game = function(cupList,num, maxNum, map) {
		let currentcupIndex = 0;
		let dest = 1;
		let pickedup
		let indexToInsert;
		for(var i = 1; i <= num; i ++) {
			pickedup = cutCups1(cupList.selectedNum)
			let find = cupList.selectedNum.num
			let insertNextto;
			let found = false;
			while(!found) {
				find --
			if(find == 0){find = maxNum}
			try{
				let t = map.get(find);
				if(t.next.next.next.next.next.next) {
					found = true;
					insertNextto = t
				}
			}catch(e){}
			}
			
			let tempCup = insertNextto.next;
			insertNextto.next = pickedup[0]
			pickedup[0].prev = insertNextto
			tempCup.prev = pickedup[1]
			pickedup[1].next = tempCup
			cupList.selectedNum = cupList.selectedNum.next
			
		}
		let t = map.get(1);
		return [cupList.selectedNum,t.next.num*t.next.next.num]
	}
	
	{
		let out = parse(input)
		let linkedArr,map;
		[linkedArr,map] = toLinkedList(out)
		let partOut = game(linkedArr,100, out.length, map)
		console.log('Pt1: ')
		printArr(partOut[0])
	}
	{
		let out = parse(input)
		for(var i = out.length+1; i <= 1000000; i ++) {
			out.push(i)
		}
		
		let linkedArr,map;
		[linkedArr,map] = toLinkedList(out)
		partOut = game(linkedArr,10000000, out.length, map)
		console.log('Pt2: ' + partOut[1])
	}
}