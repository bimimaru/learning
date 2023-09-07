// Create a class named FamilyMember
// Class should have following properties: name, age, height, weight
// Family member can sleep & greet
class FamilyMember {
    constructor(name, age, height, weight) {
        this.name = name;
        this.age = age;
        this.height = height;
        this.weight = weight;
    }
    sleep() {
        console.log(this.name + " is sleeping");
    }
    greet(x) {
        console.log("Hello " + x.name + ", my name is " + this.name);
    }
}

const to = new FamilyMember("To", 22, 70, 165)
const bim = new FamilyMember("Bim", 32, 100, 175)

to.sleep() // To is sleeping
bim.sleep() // Bim is sleeping

to.greet(bim) // Hello Bim, my name is To
bim.greet(to) // Hello To, my name is Bim
