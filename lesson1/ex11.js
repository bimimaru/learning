// Write a function that take a list of members in family. 
// Print the name of oldest person

// 1. Iterate list of members, if members[i+1].age > members[i].age => oldest = members[i+1]
// 2 End of loop => oldest.name
function findOldest(members) {
    let oldest = null;
    for (let i = 0; i < members.length - 1; i++) {
        if (members[i + 1].age > members[i].age) {
            oldest = members[i + 1];
        }
    }
    return oldest.name;
}

const to = {
    name: "To",
    age: 20
}

const nu = {
    name: "Nu",
    age: 32
}

const bim = {
    name: "Bim",
    age: 33
}

const com = {
    name: "Com",
    age: 1
}

const tam = {
    name: "Tam",
    age: 4
}

const family1 = [to, nu]
console.log(findOldest(family1)) // "Nu"
const family2 = [nu, bim, com, tam]
console.log(findOldest(family2)) // "Bim"