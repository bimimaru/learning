// Using While loop, write a function that took a list of keywords
// If "White" or "Wine" is found, remove them
function (list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] == "White" || list[i] == "Wine") { // If element is equal to White OR Wine
            list.splice(i, 1);
            continue;
        }
        console.log(removal(list));
    }
}
const list1 = ["Black", "White", "Red", "Blue"];
console.log(removal(list1)) // ["Black", "Red", "Blue"];

const list2 = ["Wine", "Nine", "Blind", "Vine", "White"];
console.log(removal(list2)) // ["Nine", "Blind", "Vine"];