import { Author } from "./author"

export type BookDTO = {
    isbn: string
    title: string
    subtitle: string
    author: string
    published: Date
    publisher: string
    pages: number
    description: string
    website: string
}
