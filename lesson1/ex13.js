// Given an object person. Write a function that allow that person to greet others

const to = {
    name: "To",
    age: 22,
    greet: function (x) {
        console.log("Hello" + x.name + " , my name is: " + this.name);
    }
}

const bim = {
    name: "Bim",
    age: 32,
    greet: function (x) {
        console.log("Hello" + x.name + " , my name is: " + this.name);
    }
}

const nu = {
    name: "Nu",
    age: 32,
    greet: function (x) {
        console.log("Hello" + x.name + " , my name is: " + this.name);
    }
}


to.greet(bim) // Hello Bim, my name is To
nu.greet(bim) // Hello Bim, my name is Nu