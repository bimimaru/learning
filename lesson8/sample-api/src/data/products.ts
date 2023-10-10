import { Product } from "src/app/product/product.entity";
import { v4 as uuidv4 } from 'uuid';
export const products: Product[] = [
    {
        id: uuidv4(),
        name: "Macbook Pro 16' 2022",
        price: 5000,
        category: "Electronics",
        enabled: false
    },
    {
        id: uuidv4(),
        name: "CBR 150R",
        price: 4000,
        category: "Motorcycle"
    },
    {
        id: uuidv4(),
        name: "Ipad Air 5 2022",
        price: 1000,
        category: "Electronics"
    },
    {
        id: uuidv4(),
        name: "PS5",
        price: 500,
        category: "Electronics"
    },
    {
        id: uuidv4(),
        name: "Printer",
        price: 300,
        category: "Electronics"
    },
    {
        id: uuidv4(),
        name: "Deep Heat",
        price: 10,
        category: "Medical"
    },
    {
        id: uuidv4(),
        name: "Harry Potter II",
        price: 30,
        category: "Book"
    },
    {
        id: uuidv4(),
        name: "Comb",
        price: 5,
        category: "Common"
    },
    {
        id: uuidv4(),
        name: "Pencil",
        price: 3,
        category: "Common"
    },
    {
        id: uuidv4(),
        name: "Bottle of milk",
        price: 10,
        category: "Common"
    }
]