let arr = [1,2,3,4,5];

for (let i = 0; i<5; i ++){
	if(isEven(arr[i])){
		console.log(arr[i])
	}
}


function isEven(value){
	if(value%2===0){
		return true;
	}else{
		return false;
	}
}
