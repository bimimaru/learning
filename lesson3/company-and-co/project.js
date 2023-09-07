class Project {
    constructor(code, partner, revenue, startDate, endDate, manager, workers) {
        this.code = code;
        this.partner = partner;
        this.revenue = revenue;
        this.startDate = startDate;
        this.endDate = endDate;
        this.manager = manager;
        this.workers = workers;
    }

}
module.exports = { Project }
