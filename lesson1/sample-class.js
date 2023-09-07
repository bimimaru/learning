class Person {
    constructor(name, tel) {
        this.name = name;
        this.tel = tel;
    }

    bark() {
        console.log(this.name + " is barking!");
    }
}
const bim = new Person("Bim", "123456");
const to = new Person("To", "098765");
const nu = new Person("Nu", "098765432312");

nu.bark()
