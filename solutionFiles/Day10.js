module.exports  = function(input) {
	diffrences = input.reduce((out, line) => {
		out.push(parseInt(line))
		return out;
	},[])
	.sort((a,b)=>a-b)
	.map((num, i, arr) => i > 0 ? num - arr[i-1] : num)
	diffrences.push(3)
	let oneD = 0,threeD = 0;
	diffrences.forEach((num => {
		if(num == 1) {oneD ++;}
		else if (num == 3){threeD ++;}
	}))
	console.log("Pt1: " + (threeD  * oneD))
	
	let len = 0;
	let total = 1;
	let contiguosOnes = diffrences
		.reduce((arr, val) => {
			if (val == 1) {len++}
			else {
				if (len > 0) {arr.push(len)}
				len = 0
			}
			return arr
		}, []);
		
		contiguosOnes.forEach(num => {total *= ((Math.pow(2, (num - 1)) - ((num - 2) * (num - 3) / 2)) || 1)})
	console.log("Pt2: " + total)
}