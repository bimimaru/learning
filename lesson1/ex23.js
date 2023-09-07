function minNotes(amount, missingNote) {
    let min = 0
    //alternative method: myNotes.splice(myNotes.findIndex((element) => element == missingNote), 1); 
    for (let i = myNotes.length - 1; amount > 0; i--) {
        if (missingNote == myNotes[i]) { //delete for the alternative method above
            continue;
        }
        let n = Math.floor(amount / myNotes[i]);
        min += n;
        amount -= n * myNotes[i];
        console.log(amount, n, myNotes[i]);
    }

    return min;
}

const myNotes = [1, 2, 5, 10, 20, 50, 100]
console.log(minNotes(188, 50))
