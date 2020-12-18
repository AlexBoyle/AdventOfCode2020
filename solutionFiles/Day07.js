module.exports  = function(input) {
	let Bag = function(key) {this.key = key; this.has=[]; this.isIn=[];}
	let BagCondition = function(bag, num) {this.bag = bag; this.num = num;}
	let parseBags = function(input) {
		let bags = {}
		input.forEach( line => {
			let words = line.split(' bags contain ');
			if(bags[words[0]] == null) {bags[words[0]] = new Bag(words[0]);}
			words[1].split(', ').forEach(rule => {
				if(!rule.startsWith('no')) {
					let ruleKey = rule.match(/ ([a-z]+ [a-z]+) /g)[0].trim();
					if(bags[ruleKey] == null){bags[ruleKey] =  new Bag(ruleKey);}
					bags[words[0]].has.push(new BagCondition(bags[ruleKey], parseInt(rule.match(/^\d+ /g)[0])))
					bags[ruleKey].isIn.push(new BagCondition(bags[words[0]], parseInt(rule.match(/^\d+ /g)[0])))
				}
			})
		})
		return bags
	}
	let getBagsThatContain = function(bags, bag) {
		return bag.isIn.reduce((fullBagList, con) => {return utility.union(fullBagList.add(con.bag.key), getBagsThatContain(bags, bags[con.bag.key]))}, (new Set([])))
	}
	let getNumBagsIn = function(bags, bag) {
		return bag.has.reduce((countBags, con) => {return countBags += con.num + (con.num * getNumBagsIn(bags, bags[con.bag.key]));}, 0)
	}
	let bags = parseBags(input);
	console.log("Pt1: " + getBagsThatContain(bags, bags['shiny gold']).size)
	console.log("Pt2: " + getNumBagsIn(bags, bags['shiny gold']) )
}