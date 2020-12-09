module.exports  = function(input) {
	input = input.reduce((out, line) => {
		out.push(parseInt(line))
		return out;
	}
	,[])
	let doAnyAdd = function(arr,length, num) {
		for (var i = 0; i < arr.length-1;  i ++) {
			for (var j = i; j < arr.length;  j ++) {
					if(arr[i] + arr[j] == num)
						return true;
			}
		}
		return false;
	}
	let pream = []
	let endOne = 0;
	for(i = 0; i < 25; i ++)
		pream.push((input[i]))
	for(var i = 25; i < input.length; i ++) {
		if(!doAnyAdd(pream, 2, (input[i]))) {
			console.log("The First bad number is " + input[i])
			endOne = (input[i])
			break;
		}
		pream.shift();
		pream.push((input[i]))
		
	}
	let arr = [];
	let subArr = null;
	for (var i = 2; i < input.length; i ++) {
		for(var j = 0; j < input.length; j++) {
			if(utility.arr.getSum(subArr = utility.arr.getSub(input,i,j))==endOne) {
				console.log("The encryption weakness is: " + (Math.min(...subArr)+Math.max(...subArr)))
				return
			}
		}
	}
}