// Write a class named Transportation. Plane, Car, Bike, Train, Ship are also transportations. 
//Transportation should have model property.

// Only Car, Bike & Train has method run that will print “${type} is running”

// Plane has method fly ⇒ Should be described inside an Interface
// Ship has method sail ⇒ Should be described inside an Interface

export abstract class Transportation {
    model: string
    constructor(model: string) {
        this.model = model;
    }
}