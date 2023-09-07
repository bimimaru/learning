/** 1. */
// Employees must have name, age, position, base salary (per day)
// If position is 'manager', salary/month is equal to workDays * baseSalary * 1.5
// If position is 'worker', salary/month is equal to workDays * baseSalary
// An employee can: start daily job (when start daily job, increase workDays by 1)
// An employee can get salary

// A Company must have name, address
// A company can hire new employee
// Write method that allow a company to calculate total of payslips for all employees per month

/** 2. */
// When a month is over, reset workDays for all employees

/** 3. */
// Company can search for employees by name. If multiple employee found, return list of employees
// Company can layoff an employee
// Company can also promote an employee from 'worker' to 'manager'.

/** 4. */
// An employee have a fixed amount of Paid Time Off (PTO) = 1 day/month if workers, 2 days/month if managers.
// Employees can leave office for 1 day. When leaveing, they can choose to use PTO or not
// If they choose to use PTO, workDays + 1, otherwise, workDays - 1
// If the number of days leave > PTO, then they are not allowed to use PTO and workDays will be decreased.

/** 5 */
// At the end of the month (before reset), employees that has more than 20 workDays will be rewarded
// They are paid extra salary equal to 2 workDays

/** 6 */
// Company can host a team building event. Where they booked places & accomodations for employees
// Each session will account for an amount of money.
// Create a class that stand for Team Building Event. 
// Event can contains: title, description, pricing, place, numberOfDays
// Calculate total amount of expense for all trips that company host

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
class Company {
    constructor(name, address) {
        this.name = name;
        this.address = address;
        this.employeeList = []
        this.eventList = []
        this.partnerList = []
        this.investedEmployee = []
    }

    employeeInvest(employee) {
        if (this.investedEmployee.length + 1 > this.employeeList.length * 0.4) {
            throw new Error(employee.name + " can not invest to company");
        } else {
            console.log(employee.name + "can invest")
            this.investedEmployee.push(employee)
        }
    }
    isCompanyMakingValue() {
        for (let i = 0; i < this.employeeList.length; i++) {
            if (this.employeeList[i].workDayCount <= 15) {
                console.log(this.name + " loss value")
                return false;
            }
        }
        console.log(this.name + " make value")
        return true;
    }
    getPartner(partner) {
        console.log(this.name + " cooperates with " + partner.name)
        this.partnerList.push(partner)
    }
    createEvent(event) {
        this.eventList.push(event);
    }
    getEventPrice() {
        let eventTotalPrice = 0
        for (let i = 0; i < this.eventList.length; i++) {
            eventTotalPrice += this.eventList[i].pricing
        }
        return eventTotalPrice;
    }

    laidOff(employee) {
        let employeeIndex = this.employeeList.findIndex((element) => element == employee)
        this.employeeList.splice(employeeIndex, 1);
    }
    promote(employee) {
        employee.position = "manager";
        employee.PTO += 1;
    }
    searchName(employee) {
        let sameNameList = [];
        for (let i = 0; i < this.employeeList.length; i++) {
            if (this.employeeList[i].name == employee.name) {
                sameNameList.push(this.employeeList[i]);
            }
        }
        return sameNameList
    }
    hire(employee) {
        console.log(this.name + " can hire " + employee.name)
        this.employeeList.push(employee)
    }
    totalPayslips() {
        let sum = 0;
        for (let i = 0; i < this.employeeList.length; i++) {
            const isInInvestmentProgram = this.investedEmployee.findIndex((employee) => employee == this.employeeList[i]) >= 0
            sum += this.employeeList[i].getSalary(isInInvestmentProgram, this.isCompanyMakingValue());
        }
        return sum;
    }
    resetMonth() {
        for (let i = 0; i < this.employeeList.length; i++) {
            this.employeeList[i].setWorkdayCount(0);
            //this.employeeList[i].workDayCount = 0;
            if (this.employeeList[i].position == "manager") {
                this.employeeList[i].PTO += 2;
            } else if (this.employeeList[i].position == "worker") {
                this.employeeList[i].PTO += 1;
            }
        }
    }
}
class TeamBuildingEvent {
    constructor(title, description, pricing, place, numberOfDays) {
        this.title = title;
        this.description = description;
        this.pricing = pricing;
        this.place = place;
        this.numberOfDays = numberOfDays;
    }
}

const to = new Employee("To", 22, "manager", 25);
const bim = new Employee("Bim", 30, "worker", 25);
const thinh = new Employee("To", 24, "worker", 25)
const xmas = new TeamBuildingEvent("Xmas", "Xmas Party", 2000, "Vincom", 2)
const tet = new TeamBuildingEvent("Tet", "Lunar New Year", 5000, "Mall", 7)
const mckenzie = new Company("McKenzie", "1 NDC")
const willis = new Company("Willis", "1 TDT")
const bcc = new Company("Brisbane City Council", "32 Brisbane")

mckenzie.hire(to);
mckenzie.hire(bim);
mckenzie.hire(thinh);
console.log(mckenzie.employeeList);

mckenzie.employeeInvest(bim);
mckenzie.employeeInvest(to);
console.log(mckenzie.investedEmployee)

to.startMonth();
bim.startMonth();
thinh.startMonth();

mckenzie.investedEmployee()

console.log(bim)
mckenzie.promote(bim)

console.log(mckenzie.totalPayslips())
mckenzie.resetMonth()
console.log(mckenzie.totalPayslips())
console.log(bim)

console.log(mckenzie.searchName(to))

mckenzie.createEvent(tet)
mckenzie.createEvent(xmas)
console.log(mckenzie.getEventPrice())

mckenzie.getPartner(bcc)
mckenzie.getPartner(willis)
console.log(mckenzie.partnerList)