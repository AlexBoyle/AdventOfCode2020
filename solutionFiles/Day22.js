module.exports  = function(input) {
	let parse = function(input) {
		let deck1 = []
		let deck2 = []
		
		var i = 1
		for(; input[i] != ''; i ++) {
			deck1.push(parseInt(input[i]))
		}
		i++;i++
		for(; input[i] != '' && input[i] != null; i ++) {
			deck2.push(parseInt(input[i]))
		}
		return [deck1, deck2]
	}
	let game = function(deck1, deck2, rec = false) {
		let states = new Set([]);
		while(deck1.length && deck2.length) {
			let currentState = deck1.join('')+ ":" + deck2.join('')
			if(rec && states.has(currentState)) {return 1;}
			states.add(currentState)
			
			let draw1 = deck1.shift(),draw2 = deck2.shift();
			let result = draw1 > draw2 ? 1 : 2;

			if(rec && draw1 <= deck1.length && draw2 <= deck2.length) {
				result = game([...deck1].slice(0,draw1), [...deck2].slice(0,draw2), rec);
			}

			if(result == 1) {deck1.push(draw1,draw2)}
			else {deck2.push(draw2,draw1)}
		}
		return (deck1.length ? 1 : 2)
	}
	let getCount = function(deck) {
		let count = 0
		for(var i = 0; i < deck.length; i ++) {
			count += (deck[i]*(deck.length-i))
		}
		return count
	}
	{
	let deck1, deck2;
	[deck1, deck2] = parse(input)
	game(deck1, deck2)
	console.log('Pt1: ' + getCount((deck1.length == 0 ? deck2 : deck1)))
	}
	{
	let deck1, deck2;
	[deck1, deck2] = parse(input)
	game(deck1, deck2, true)
	console.log('Pt2: ' + getCount((deck1.length == 0 ? deck2 : deck1)))
	}
}