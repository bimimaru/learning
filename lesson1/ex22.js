const moneyNotes = [1, 2, 5, 10, 20, 50, 100]
//i=moneyNotes.length = 6; n=math.floor(188/100)=1; amount= 188-1*100=88; min=0+1=1;

function numberOfNotes(amount) {
    let min = 0;
    for (let i = moneyNotes.length - 1; amount > 0; i--) {
        let n = Math.floor(amount / moneyNotes[i]);
        amount -= n * moneyNotes[i];
        min += n;
    }
    return min;
}


console.log(numberOfNotes(200));