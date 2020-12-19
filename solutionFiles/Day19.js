module.exports  = function(input) {
	const LETTER_MATCH = "letterMatch", RULE_MATCH = "ruleMatch", RULE_OR_MATCH = "ruleOrMatch";
	let Rule = function(num, type, rule, reg = null){this.num = num; this.type = type; this.rule = rule, this.reg = reg}
	let rules = new Map(), i=0;
	while(input[i] != '') {
		let a = input[i].split(': ')
		if(a[1].includes('"'))
			rules.set(a[0],new Rule(a[0], LETTER_MATCH, a[1].charAt(1), a[1].charAt(1)))
		
		else if(a[1].includes('|')) {
			let parsedRule = a[1].split(' | ')
			rules.set(a[0],new Rule(a[0], RULE_OR_MATCH,[parsedRule[0].split(' '), parsedRule[1].split(' ')]))
		}
		else {
			rules.set(a[0],new Rule(a[0], RULE_MATCH,a[1].split(' ')))
		}
		i++
	}
	let generateRegexFor = function(regexArr) {
		let newReg = []
		//console.log(regexArr)
		for(var j = 0; j < regexArr.length; j ++) {
			if(+regexArr[j] != NaN) {
				let currentRule = rules.get(regexArr[j])
				//console.log(currentRule)
				//console.log(regexArr[j])
				switch(currentRule.type) {
					case LETTER_MATCH:
						newReg.push(currentRule.rule);
						break;
					case RULE_MATCH:
						if(currentRule.reg == null) {
							newReg = [...newReg, ...currentRule.rule.reduce((out, ruleNum) => {
								out = [...out, ...generateRegexFor([ruleNum])]
								return out;
							}, [])]
							currentRule.reg = newReg.join('')
						}
						else {
							newReg = [...newReg, currentRule.reg]
						}
						break;
					case RULE_OR_MATCH:
						if(currentRule.reg == null) {
							newReg = [...newReg, ...currentRule.rule.reduce((out, ruleArr) => {
									out = [...out,...ruleArr.reduce((out1,ruleNum) =>{
										out1 = [...out1, ...generateRegexFor([ruleNum])]
										return out1;
									},[])]
									
									out.push('|')
								return out;
							}, ['(?:'])]
							newReg.pop()
							newReg.push(')')
							currentRule.reg = newReg.join('')
						}
						else {
							newReg = [...newReg, currentRule.reg]
						}
						break;
				}
			}
			return newReg
		}
	}


	i++
	let tempi = i;
	let regGen = generateRegexFor(['0'])
	regGen.unshift('^')
	regGen.push('$')
	let re = new RegExp(regGen.join(''), '');
	let count = 0;
	for(; i < input.length; i++) {
		if(input[i].match(re) != null)
			count ++
	}
	console.log('Pt1: ' + count)
	
	
	rules.get('8').reg = '(?:(?:' + rules.get('42').reg + ')+)'
	rules.get('11').reg = 
		'(?:(?:(?:' + rules.get('42').reg + '){1}(?:' + rules.get('31').reg + '){1})|' + 
		'(?:(?:' + rules.get('42').reg + '){2}(?:' + rules.get('31').reg + '){2})|' +
		'(?:(?:' + rules.get('42').reg + '){3}(?:' + rules.get('31').reg + '){3})|' +
		'(?:(?:' + rules.get('42').reg + '){4}(?:' + rules.get('31').reg + '){4})|' +
		'(?:(?:' + rules.get('42').reg + '){5}(?:' + rules.get('31').reg + '){5}))'
	rules.get('0').reg = null
	
	regGen = generateRegexFor(['0'])
		console.log(rules.get('0').reg)
	regGen.unshift('^')
	regGen.push('$')
	re = new RegExp(regGen.join(''), '');
	count = 0;
	i = tempi;
	for(; i < input.length; i++) {
		if(input[i].match(re) != null)
			count ++
	}
	console.log('Pt2: ' + count)
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}