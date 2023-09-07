class Employee {
    name: string
    age: number
    position: string
    baseSalary: number
    workDays: number
    pto: number
    usedPTO: boolean

    constructor(name: string, age: number, position: string, baseSalary: number) {
        this.name = name;
        this.age = age;
        this.position = position;
        this.baseSalary = baseSalary;
        this.workDays = 0
        this.pto = 1
        if (this.position == "manager") {
            this.pto = 2
        } else if (this.position == "worker") {
            this.pto = 1
        }
        this.usedPTO = false;
    }

    checkPTO(usedPTO: boolean) {//4
        if (usedPTO == true && this.pto > 0) {
            this.workDays++;
            this.pto--;
        } else {
            this.workDays--;
        }
    }

    setPosition(position: string) {
        this.position = position;
    }

    startDailyJob() {//1
        //console.log(this.name + " goes to work.");
        this.workDays++;
    }

    startDaysInAMonth(n: number) {//1*
        if (n > 31) {
            throw new Error("Number of working days cannot exceed the number of days in a month.")
        } else {
            for (let i = 0; i < n; i++) {
                this.startDailyJob()
            }
        }
    }

    setWorkDays(workDays: number) {
        this.workDays = workDays;
    }

    getWorkDays() {
        return this.workDays;
    }

    getName() {
        return this.name;
    }

    getSalary(): number { //1 
        let total: number = 0;
        if (this.position == "manager") {
            total = this.workDays * this.baseSalary * 1.5
        } else if (this.position == "worker") {
            total = this.workDays * this.baseSalary
        }
        return total;
    }
}
export { Employee }
