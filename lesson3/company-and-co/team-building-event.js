class TeamBuildingEvent {
    constructor(title, description, pricing, place, numberOfDays) {
        this.title = title;
        this.description = description;
        this.pricing = pricing;
        this.place = place;
        this.numberOfDays = numberOfDays;
    }
}
module.exports = { TeamBuildingEvent }