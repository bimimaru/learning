import { Company } from "./company";
import { Employee } from "./employee";
import { Event } from "./team-building-event";

const mckenzie = new Company("Mackenzie", "123 NDC")

const to = new Employee("To", 22, "manager", 30)
const bim = new Employee("Bim", 32, "worker", 30)

mckenzie.hire(to)
mckenzie.hire(bim)

to.startDaysInAMonth(15)
bim.startDaysInAMonth(30)
console.log(to.getSalary())
console.log(bim.getSalary())

console.log(mckenzie.getTotalPay())
mckenzie.resetMonthlyWorkDays()
