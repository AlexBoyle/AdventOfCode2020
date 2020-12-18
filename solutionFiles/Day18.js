module.exports  = function(input) {
	let digits = [..."0123456789"]
	let operations = [..."+*"]
	let operation = {
		'+': function(a,b){return a+b},
		'-': function(a,b){return a-b},
	}
	let leftToRightCalc = function(input) {
		let conIn = input.join('')
		while(conIn.includes('+') || conIn.includes('*')) {
			let match = conIn.match(/\d+[\+\*]\d+/) 
			let newVal = eval(match[0])
			conIn = conIn.toString().replace(match[0], newVal + "")
		}
		return eval(conIn)
	}
	let additionIsBetter = function(input) {
		let conIn = input.join('')
		while(conIn.includes('+')) {
			let match = conIn.match(/\d+\+\d+/) 
			let newVal = eval(match[0])
			conIn = conIn.toString().replace(match[0], newVal + "")
		}
		return eval(conIn)
	}
	let calculate = function(input, evalWith) {
		let stack = []
		let parCount = 0;
		let parTemp = "";
		[...input].forEach((chr) => {
			if(parCount != 0) {
				if(chr == ')'){parCount--}
				if(chr == '('){parCount++}
				if(parCount!= 0) {
					parTemp += chr
				}
				if(parCount==0) {
					stack.push(calculate(parTemp, evalWith))
					parTemp = ""
				}
			}
			else if(digits.includes(chr)){
				stack.push(parseInt(chr))
			}
			else if (chr.includes('+') || chr.includes('*')) {
				stack.push(chr)
			}
			else if(chr=='(') {
				parCount++
			}
		})
		return evalWith(stack)
	}
	let sum = 0;
	input.forEach((problem) =>{sum += calculate(problem, leftToRightCalc)})
	console.log('Pt1: ' + sum)
	
	sum = 0;
	input.forEach((problem) =>{sum += calculate(problem, additionIsBetter)})
	console.log('Pt2: ' + sum)
}