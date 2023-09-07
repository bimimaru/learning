// Given a number
// Return the reverse digits of that number

// math solution
function revNum(y) {
    console.log(y[0])
}

//number into array, push into new reversed arr then join
/*function arrNumber(x) {
    return Array.from(String(x), Number);
}
function reverseNumber(arrNumber) {
    let arr1 = [];
    for (let i = arrNumber.length - 1; i >= 0; i--) {
        arr1.push(arrNumber[i]);
    }
    if (arr1[0] == 0) {
        arr1.splice(0, 1)
    }
    num = arr1.join("")
    return num;
}*/

const x1 = 1234; // 4321
const x2 = 3579; // 9753
const x3 = 1; // 1
const x4 = 10; // 1
// console.log(reverseNumber(arrNumber(x1)))
// console.log(reverseNumber(arrNumber(x2)))
// console.log(reverseNumber(arrNumber(x3)))
// console.log(reverseNumber(arrNumber(x4)))
console.log(revNum(x1))