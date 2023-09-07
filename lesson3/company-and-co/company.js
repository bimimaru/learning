const luxon = require("luxon")

class Company {
    constructor(name, address) {
        this.name = name;
        this.address = address;
        this.employeeList = []
        this.eventList = []
        this.partnerList = []
        this.investedEmployee = []
        this.projects = []
    }
    findProject20days() {
        let projects = []
        for (let i = 0; i < this.projects.length; i++) {
            const diff = luxon.Interval.fromDateTimes(this.projects[i].startDate, this.projects[i].endDate);
            const diffDays = diff.length('days')
            console.log(diffDays)
            if (diffDays > 20) {
                projects.push(this.projects[i])
            }
        }
        return projects;
    }

    closeContractWorker(worker, project) {
        for (i = 0; i < project.workers.length; i++) {
            if (project.workers[i] == worker) {
                project.workers.splice(i, 1)
            }
        }
    }
    getProject(project) {
        console.log(this.name + " take this project " + project.code)
        this.projects.push(project)
    }
    getProjectRevenue() {
        let total = 0
        for (let i = 0; i < this.projects.length; i++) {
            total += this.projects[i].revenue;
        }
        return total;
    }
    searchProjectCode(code) {
        return this.projects.find((element) => element.code == code);

        // alternative option as below
        // for (let i = 0; i < this.projects.length; i++) {
        //     if (this.projects[i].code == code) {
        //         return this.projects[i];
        //     } else {
        //         return null;
        //     }
        // }
    }
    searchProjectManger(manager) {
        let projects = []
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].manager == manager) {
                projects.push(this.projects[i]);
            }
        }
        return projects;
    }
    searchProjectHighRevenue() {
        let max = this.projects[0].revenue;
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].revenue > max) {
                max = this.projects[i].revenue;
            }
        }
        return max;
    }
    searchProjectLowRevenue() {
        let min = this.projects[0].revenue;
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].revenue < min) {
                min = this.projects[i].revenue;
            }
        }
        return min;
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
module.exports = { Company }