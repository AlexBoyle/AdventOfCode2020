
module.exports  = function(input) {

	
	let step = function(subject, val) {
		val *= subject;
		val = (val%20201227)
		return val
	}

	let process = function(subject, loopNum) {
		let val = 1;
		for(var i = 0; i< loopNum; i ++) {
			val = step(subject, val)
		}
		return val
	}
	
	let getLoop = function(input) {
		let subject = 7;
		let val = 1;
		let loops = 0;
		while(val != input) {
			loops ++;
			val = step(subject,val)
			
		}
		return loops;
	}
	let loops = getLoop(parseInt(input[0]))
	console.log(process(parseInt(input[1]),loops))
}