// Company can host a team building event. Where they booked places & accomodations for employees
// Each session will account for an amount of money.
// Create a class that stand for Team Building Event. 
// Event can contains: title, description, pricing, place, numberOfDays
// Calculate total amount of expense for all trips that company host
class Event {
    title: string
    description: string
    pricing: number
    place: string
    numberOfDays: number

    constructor(title: string, description: string, pricing: number, place: string, numberOfDays: number) {
        this.title = title;
        this.description = description;
        this.pricing = pricing;
        this.place = place;
        this.numberOfDays = numberOfDays;
    }
}
export { Event }