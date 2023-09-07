import { Employee } from "./employee";
import { Event } from "./team-building-event";

class Company {
    name: string
    address: string
    employees: Employee[]
    events: Event[]

    constructor(name: string, address: string) {
        this.name = name;
        this.address = address;
        this.employees = []
        this.events = []
    }
    checkValueCompany(): boolean {
        for (let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].workDays <= 15) {
                return false;
            }
        }
        return true;
    }
    getEventsExpense(): number {//6
        let total: number = 0
        for (let i = 0; i < this.events.length; i++) {
            total += this.events[i].pricing;
        }
        return total;
    }
    addEvent(event: Event) {//6
        this.events.push(event)
    }
    promoteEmployee(employee: Employee) { //3
        let foundIndex = this.employees.findIndex((element) => element == employee)
        this.employees[foundIndex].setPosition("manager");
        this.employees[foundIndex].pto += 1;
    }

    laidOffEmployee(employee: Employee) {//3
        let foundIndex = this.employees.findIndex((element) => element == employee)
        this.employees.splice(foundIndex, 1);
    }

    searchEmployeeByName(name: string): Employee[] {//3
        let foundEmployee: Employee[] = [];
        for (let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].getName() == name) {
                foundEmployee.push(this.employees[i]);
            }
        }
        return foundEmployee;
    }

    hire(employee: Employee) {
        this.employees.push(employee)
    }

    resetMonthlyWorkDays() { //2
        for (let i = 0; i < this.employees.length; i++) {
            this.employees[i].setWorkDays(0)

            //7
            if (this.employees[i].position == "manager") {
                this.employees[i].pto += 2
            } else if (this.employees[i].position == "worker") {
                this.employees[i].pto += 1
            }
        }
    }

    getTotalPay(): number { //1
        let total: number = 0
        for (let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].workDays >= 20) {//5
                this.employees[i].workDays += 2;
                this.employees[i].getSalary()
            }
            total += this.employees[i].getSalary();
        }
        return total;
    }

}
export { Company }