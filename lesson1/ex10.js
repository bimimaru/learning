// Write a function that concat strings in a list
// If an element is null, skip the loop, if an element is equal to "break", return the current value
function firstNullLast(list) {
    let sum = ""
    for (let i = 0; i < list.length; i++) {
        if (list[i] == null) {
            continue;
        } else if (list[i] == "break") {
            break;
        }
        sum += list[i]
    }
    return sum;
}


const list1 = ["TV", "Iron", null, "AC", "Fridge"]
console.log(firstNullLast(list1)) // "TVIronACFridge"

const list2 = ["TV", "Iron", "break", "AC"]
console.log(firstNullLast(list2)) // "TVIron"

const list3 = ["TV", null, "break"]
console.log(firstNullLast(list3)) // "TV"

const list4 = ["break"]
console.log(firstNullLast(list4)) // ""