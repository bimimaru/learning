class Tire {
    //company, model, size
    company: string;
    model: string;
    size: string;
    constructor(company: string, model: string, size: string) {
        this.company = company;
        this.model = model;
        this.size = size;
    }
}

export { Tire }