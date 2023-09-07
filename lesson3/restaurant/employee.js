class Employee {
    constructor(name, phoneNumber, position) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.position = position;
        if (this.position == "manager") {
            this.baseSalary = 50
        }
        if (this.position == "chef") {
            this.baseSalary = 30
        }
        if (this.position == "waiter") {
            this.baseSalary = 20
        }
        this.salary = this.baseSalary;
    }

    getSalary() {
        return this.salary;
    }

    updateSalaryBasedOnMealCost(mealCost) {
        if (this.position == "manager") {
            this.salary += 0.01 * mealCost
        } else if (this.position == "chef") {
            this.salary += 0.02 * mealCost
        } else if (this.position == "waiter") {
            this.salary += 0.02 * mealCost
        }
    }
}
module.exports = { Employee }