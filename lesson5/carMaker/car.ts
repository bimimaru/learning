class Car {
    //model, color, tires (list of tires)
    model: string;
    color: string;
    tires: object[];

    constructor(model: string, color: string, tires: object[]) {
        this.model = model;
        this.color = color;
        this.tires = tires;
    }

    install(tire: object[]) {
        this.tires = tire;
    }

    run(kilometers: number) {
        console.log('Car ran ' + kilometers + " km.")
    }
}

export { Car }