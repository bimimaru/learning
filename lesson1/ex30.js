// Find shortest/longest word in string

// "Le Hoang Thinh" => 5
// "Nguyen Minh Thien" => 6
// "123".split("") => ["1", "2", "3"]
// let arr = a.split("");
// const newArr = reverseArray(arr);
// newArr.join("");
// return newArr;

function longestWord(string) {
    let arr = string.split(" ");
    let max = 0;
    for (let i = 0; i < arr.length - 1; i++) {

        if (arr[i].length > max) {
            max = arr[i].length;
        }
    }
    return max;
}

function shortestWord(string) {
    let arr = string.split(" ");
    let min = arr[0].length;
    for (let i = 0; i < arr.length - 1; i++) {

        if (arr[i].length < min) {
            min = arr[i].length;
        }
    }
    return min;
}

let string1 = "Le Hoang Thinh"
let string2 = "Nguyen Minh Thien"
console.log(shortestWord(string1))
console.log(shortestWord(string2))
console.log(longestWord(string1))
console.log(longestWord(string2))