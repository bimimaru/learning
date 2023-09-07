const { Company } = require("./company.js")
const { Employee } = require("./employee.js")
const { TeamBuildingEvent } = require("./team-building-event.js")
const { Project } = require("./project.js")
const luxon = require("luxon")

const to = new Employee("To", 22, "manager", 25);
const bim = new Employee("Bim", 30, "worker", 25);
const thinh = new Employee("To", 24, "worker", 25)
const xmas = new TeamBuildingEvent("Xmas", "Xmas Party", 2000, "Vincom", 2)
const tet = new TeamBuildingEvent("Tet", "Lunar New Year", 5000, "Mall", 7)
const mckenzie = new Company("McKenzie", "1 NDC")
const willis = new Company("Willis", "1 TDT")
const bcc = new Company("Brisbane City Council", "32 Brisbane")

const funny = new Project("101lol", "Willis", "77777777", luxon.DateTime.fromISO("2023-11-17"), luxon.DateTime.fromISO("2024-05-21"), to, [bim, thinh])

mckenzie.hire(to);
mckenzie.hire(bim);
mckenzie.hire(thinh);
console.log(mckenzie.employeeList);

try {
    mckenzie.employeeInvest(to);
} catch (e) {
    console.log(e)
}
try {
    mckenzie.employeeInvest(bim)
} catch (e) {
    console.log(e)
}
console.log(mckenzie.investedEmployee)

to.startMonth();
bim.startMonth();
thinh.startMonth();

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

mckenzie.getProject(funny)
console.log(mckenzie.findProject20days())