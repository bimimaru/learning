// A palindrome is a word or sentence that's spelled the same way both forward 
// and backward, ignoring punctuation, case, and spacing.

// Check if a given string is palindrome or not
function palindrome(str) {
    let arr = str.split("");
    for (let i = 0; i < arr.length / 2; i++) {
        if (arr[i] != arr[arr.length - i - 1]) {
            return false;
        }
    }
    return true;
}

const str1 = "aba" // true
const str2 = "abc" // false
console.log(palindrome(str1))
console.log(palindrome(str2))