module.exports  = function(input) {
	let range = function(rangeArr){this.low = parseInt(rangeArr[0]); this.high = parseInt(rangeArr[1])}
	let parse = function(input) {
		let output = {
			'rules': {},
			'myTicket': [],
			'otherTickets': [],
		}
		var i = 0;
		for(; i < input.length; i++) {
			if(input[i] == '') { break; }
			let parse = input[i].split(': '), ranges = parse[1].split(' or ')
			output.rules[parse[0]] = [
				new range(ranges[0].split('-')),
				new range(ranges[1].split('-'))
			];
		}
		i++;i++;output.myTicket = input[i].split(',');i++;i++;i++
		for(; i < input.length; i++) {
			output.otherTickets.push(input[i].split(','))
		}
		return output;
	}
	let doesMatchAnyRange = function(num, rules) {
		let keys = Object.keys(rules);
		for(var j = 0; j < keys.length; j ++) {if(doesMatchRule(num, rules[keys[j]]) ) {return  true;}}
		return false;
	}
	let doesMatchRule = function(num, rule) {
		if((num >= rule[0].low && num <= rule[0].high) || (num >= rule[1].low && num <= rule[1].high )) { return  true; }
		return false
	}
	let rules, myTicket, otherTickets, order = [], errorList = [], total = 1; [rules, myTicket, otherTickets]= Object.values(parse(input));
	otherTickets = otherTickets.reduce((newList, ticket) => {
		let shouldAdd = true;
		ticket.forEach((number) => {if(!doesMatchAnyRange(parseInt(number), rules)) {errorList.push(parseInt(number));shouldAdd = false; }})
		if(shouldAdd) { newList.push(ticket); }
		return newList;
	}, [])
	for(var j = 0; j < otherTickets[0].length; j ++) {
		let ruleKeys = Object.keys(rules);
		for(var k = 0; k < otherTickets.length; k ++) {
			for(var l = 0; l < ruleKeys.length; l ++) {
				if(!doesMatchRule(parseInt(otherTickets[k][j]), rules[ruleKeys[l]])) {
					ruleKeys.splice(l, 1)
					l--
				}
				if(ruleKeys.length == 100) {
					console.log(ruleKeys)
					console.log(otherTickets[k])
					console.log('\n\n')
				}
			}
			
		}
		order.push(ruleKeys)
	}
	let skip = []
	for(var j = 0; j <  Object.keys(rules).length; j++) {
		for(var k = 0; k < order.length; k++) {
			if(skip.indexOf(k) == -1 && order[k].length == 1) {
				skip.push(k)
				for(var l = 0; l < order.length; l++) {
					if(l != k) {
						if(order[l].indexOf(order[k][0]) != -1)
							order[l].splice(order[l].indexOf(order[k][0]), 1)
					}
				}
			}
		}
	}
	for(var j = 0; j < order.length; j ++) {if(order[j][0].includes('departure')) {total*=myTicket[j]}}
	console.log("Pt1: " +utility.arr.getSum(errorList))
	console.log('Pt2: ' + total)
}