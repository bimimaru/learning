class Employee {
    constructor(name, age, position, baseSalary) {
        this.name = name;
        this.age = age;
        this.position = position;
        this.baseSalary = baseSalary;
        this.workDayCount = 0;
        if (this.position == "manager") {
            this.PTO = 2
        } else if (this.position == "worker") {
            this.PTO = 1
        }
    }

    setName(name) {
        // throw new Error("You can not change my name!")
        this.name = name;
    }
    setWorkdayCount(workDay) {
        this.workDayCount = workDay;
    }
    getSalary(isInInvestmentProgram, isCompanyMakingValue) {
        let result = 0;
        result += this.workDayCount * this.baseSalary;
        if (this.workDayCount > 20) {
            result += 2 * this.baseSalary;
        }
        if (this.position == "manager") {
            result *= 1.5;
        } else if (this.position == "worker") {
            result *= 1;
        }

        if (isInInvestmentProgram) {
            if (isCompanyMakingValue) {
                result *= 1.5;
            } else {
                result *= 0.8
            }
        } else {
            result *= 1
        }
        return result;
    }
    startJob() {
        this.workDayCount = this.workDayCount + 1;
        //console.log(this.name + " started daily job")
    }
    startMonth() {
        for (let i = 1; i <= 30; i++) {
            this.startJob()
        }
    }
    paidTimeOff(usedPTO) {
        if (this.PTO > 0) {
            if (usedPTO == false) {
                this.workDayCount -= 1
            } else {
                this.workDayCount += 1
                this.PTO -= 1;
            }
        } else {
            this.workDayCount -= 1;
        }
    }
}

Employee.prototype.toString = function () {
    return this.name
}

module.exports = { Employee }