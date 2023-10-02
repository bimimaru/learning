import { AuthorDTO } from "./author-dto"

export class Author {
    private author: string
    private country: string
    private imageLink: string
    private year: number
    constructor(author: string, country: string, imageLink: string, year: number) {
        this.author = author
        this.country = country
        this.imageLink = imageLink
        this.year = year;
    }
    getAuthor(): string {
        return this.author;
    }

    static mapFromDTO(authorDTO: AuthorDTO): Author {
        return new Author(
            authorDTO.author,
            authorDTO.country,
            authorDTO.imageLink,
            authorDTO.year
        )
    }
}