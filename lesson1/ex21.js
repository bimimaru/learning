function minNumber(a, b) {
    if (a == 0 || b == 0) {
        return NaN;
    }
    let max;
    if (a > b) {
        max = a
    } else {
        max = b
    }

    let count = 0;
    for (let x = max; x <= a * b; x++) {
        count++;
        if (x % a == 0 && x % b == 0) {
            console.log(count)
            return x;
        }
    }


}

console.log(minNumber(4, 6))