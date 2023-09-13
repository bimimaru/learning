// Write class Employee to desribe an employee in A&J. Employee has properties: id, name, age, email
// An employee can be assigned as a market manager. Now market will store it's manager

export class Employee {
    private id: string
    private name: string
    private age: number
    private email: string
    constructor(id: string, name: string, age: number, email: string) {
        this.id = id
        this.name = name
        this.age = age
        this.email = email
    }
}