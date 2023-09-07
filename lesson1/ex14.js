// Given a list of people. Remove duplicated people from the list.
// Duplicated people are people that have the same name & age

// To, Bim, To
//i = 0 | j = 1 | list[i] = To, list[j] = bim. If (list[i]==list[j]) => remove at j
function removeDuplicated(list) {
    for (let i = 0; i < list.length - 1; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[j].name == list[i].name && list[j].age == list[i].age) {
                list.splice(j, 1);
                j--
            }
        }
    }
    return list;
}
function mapPersonToName(list) {
    for (let x = 0; x < list.length; x++) {
        list[x] = list[x].name;
    }
    return list;
}


const to = {
    name: "To",
    age: 20
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

const list1 = [to, bim, to]
console.log(mapPersonToName(removeDuplicated(list1))) // [to,bim]
const list2 = [to, bim, to, to]
console.log(mapPersonToName(removeDuplicated(list2))) // [to,bim,nu]
const list3 = [bim, to, to, com, tam]
console.log(mapPersonToName(removeDuplicated(list3))) // [bim,nu,to,com,tam]