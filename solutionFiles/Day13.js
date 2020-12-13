module.exports  = function(input) {
	let timestamp = parseInt(input[0])
	let busList = input[1].split(',').reduce((out, line, index) => {
		if(line != 'x') {
			out.push({"id": parseInt(line), "index": index})
		}
		return out
	},[])
	let getWaitTime = function(bus, time){ return (Math.ceil(time / bus.id) * bus.id) - time;}
	let part1 = function(timestamp, busList) {
		let lowestBus = busList[0];
		busList.forEach((bus) => {if(getWaitTime(lowestBus,timestamp) > getWaitTime(bus,timestamp)) {lowestBus = bus}})
		console.log("Pt1: " + (getWaitTime(lowestBus,timestamp) * lowestBus.id))
	}
	let part2 = function(timestamp, busList) {
		let product = 1,total = 0;
		busList.forEach((bus) => {
			while(!((total + bus.index) % bus.id) == 0) {
				total += product
			}
			product *= bus.id
		})
		console.log("Pt2: " + total)
	}
	
	
	
	part1(timestamp, busList);
	part2(timestamp, busList);
}