module.exports  = function(input) {
	
	console.log('\n\n\n\n\n\n\n\n')
	let parsedInput = input.reduce((out, line) => {
		
		let sp = line.split(' (contains ')
		out.push({'text': sp[0].split(' '), 'allergin': sp[1].slice(0, -1).split(', ')})
		return out
	},[])
	
	let groupByContains = function(input) {
		let output = {};
		for(var i = 0; i < input.length; i ++) {
			for(var j = 0; j < input[i].allergin.length; j++) {
				if(output[input[i].allergin[j]] == null) {output[input[i].allergin[j]] = []}
				output[input[i].allergin[j]].push(input[i])
			}
		}
		return output
	}
	
	let findSameText = function(textList) {
		let list = [...textList[0].text]
		for(var i = 1; i < textList.length; i ++) {
			list = utility.intersect(list, textList[i].text)
		}
		return list;
	}
	let getOccurencesOf = function(input, checkFor) {
		let count = 0; 
		input.forEach((line) => {
			for(var j = 0; j < line.text.length; j ++ ) {
				
				if(checkFor.includes(line.text[j])) {
					count++
				}
			}
		})
		return count;
	}
	let getAllTextNotInList = function(parsedInput, bannedList) {
		let safeWords = new Set();
		parsedInput.forEach((line) => {
			for(var j = 0; j < line.text.length; j ++ ) {
				if(!safeWords.has(line.text[j]) && !bannedList.includes(line.text[j])) {
					safeWords.add(line.text[j])
				}
			}
		})
		return safeWords
	}
	
	let groups = groupByContains(parsedInput)
	let groupKeys = Object.keys(groups)
	
	let allerginWords = []
	for(var i = 0; i < groupKeys.length; i ++) {
		let similarWords = findSameText(groups[groupKeys[i]])
		allerginWords = [...allerginWords, ...similarWords]
	}
	allerginWords = [...(new Set(allerginWords))]
	let maybeAllerginWords = [...getAllTextNotInList(parsedInput, allerginWords)]
	console.log(getOccurencesOf(parsedInput, maybeAllerginWords))
	
	
	
	
	
	
	
	let allerginWordGroups = {}
	for(var i = 0; i < groupKeys.length; i ++) {
		let similarWords = findSameText(groups[groupKeys[i]])
		allerginWordGroups[groupKeys[i]] = findSameText(groups[groupKeys[i]])
	}
	console.log("")
	console.log("")

	
	
	let skip = []
	for(var j = 0; j <  allerginWords.length; j++) {
		for(var k = 0; k < groupKeys.length; k++) {
			if(skip.indexOf(k) == -1 && allerginWordGroups[groupKeys[k]].length == 1) {
				skip.push(k)
				for(var l = 0; l < groupKeys.length; l++) {
					if(l != k) {
						if(allerginWordGroups[groupKeys[l]].indexOf(allerginWordGroups[groupKeys[k]][0]) != -1)
							allerginWordGroups[groupKeys[l]].splice(allerginWordGroups[groupKeys[l]].indexOf(allerginWordGroups[groupKeys[k]][0]), 1)
					}
				}
			}
		}
	}
	
	groupKeys.sort();
	let outString = ""
	for (i = 0; i < groupKeys.length; i++) {
	  outString += allerginWordGroups[groupKeys[i]]+',';
	}
	outString = outString.slice(0,-1)
	console.log(outString)
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}