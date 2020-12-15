module.exports  = function(input) {
	let timestamp = parseInt(input[0])
	let instructionList = input.reduce((out, line, index) => {
			let parse = line.split(' = ')
			out.push({"inst": parse[0], "value": parse[1]})
		return out
	},[])
	var dupArr = function(arr) {
		return arr.reduce((out, value) => {
			out.push([...value])
			out.push([...value])
			return out;
		},[])
	}
	let applyMask1 = function(mask, number) {
		let maskList = mask.split('')
		let length = maskList.length
		let bi = number.toString(2).padStart(length, '0').split('');
		
		for(var i = 0; i < bi.length ; i ++) {
		
			if(maskList[maskList.length-1-i] == 'X') {
				continue;
			}
			else {
				bi[bi.length-1-i] = maskList[maskList.length-1-i];
			}
		}
		return parseInt(bi.join(''),2)
		
	}
	var applyMask2 = function(mask, number) {
		let maskList = mask.split('')
		let length = maskList.length
		let outputArr = [number.toString(2).padStart(length, '0').split('')];
		for(var i = 0; i < length ; i ++) {
			if(maskList[maskList.length-1-i] == '1') {
				for(let j = 0; j < outputArr.length; j++) {
					outputArr[j][maskList.length-1-i]='1'
				}
			}
			else if(maskList[maskList.length-1-i] == 'X') {
				let len = outputArr.length-1;
				outputArr = dupArr(outputArr);
				for(let j = 0; j <= len; j++) {
					outputArr[j*2][maskList.length-1-i]='0'
					outputArr[(j*2)+1][maskList.length-1-i]='1'
				}
			}
		}
		return outputArr.reduce((out, value) => {
			out.push(parseInt(value.join(''),2))
			return out;
		},[])
		
	}
	let part1 = function(instructionList) {
		let mask = instructionList[0];
		let mem = {};
		for(var i = 0; i < instructionList.length; i ++) {
			let instruction = instructionList[i];
			if(instruction.inst == 'mask') {
				mask = instruction;
			}
			else {
				let memIndex = instruction.inst.match(/\d+/)[0]
				mem[memIndex] = applyMask1(mask.value, parseInt(instruction.value))
			}
		}
		let total = 0;
		for (const property in mem) {
			total +=  mem[property];
		}
		console.log('Pt1: ' + total)
	}
	
	
	
	
	
	let part2 = function(instructionList) {
		let mask,mem = {};
		for(var i = 0; i < instructionList.length; i ++) {
			let instruction = instructionList[i];
			if(instruction.inst == 'mask') {mask = instruction;}
			else {
				let memIndex = instruction.inst.match(/\d+/)[0]
				let memIndexList = applyMask2(mask.value, parseInt(memIndex))
				memIndexList.forEach((value)=> {
					mem[value] = parseInt(instruction.value)
				})
			}
		}
		let total = 0;
		for (const property in mem) {
			total +=  mem[property];
		}
		console.log('Pt2: ' + total)
	}
	
	
	
	part1(instructionList);
	part2(instructionList);

}