import { Author } from "./author"
import { BookDTO } from "./book-dto"

export class Book {
    private isbn: string
    private title: string
    private subtitle: string
    private author: string
    private published: Date
    private publisher: string
    private pages: number
    private description: string
    private website: string
    private isLike: boolean
    constructor(isbn: string, title: string, subtitle: string, author: string, published: Date, publisher: string, pages: number, description: string, website: string) {
        this.isbn = isbn
        this.title = title
        this.subtitle = subtitle
        this.author = author
        this.published = published
        this.publisher = publisher
        this.pages = pages;
        this.description = description;
        this.website = website;
    }
    public getTitle(): string {
        return this.title;
    }
    public getPages(): number {
        return this.pages;
    }
    public getAuthor(): string {
        return this.author;
    }
    public getID(): string {
        return this.isbn;
    }
    public getIsLike() {
        return this.isLike;
    }
    public setIsLike(boolean: boolean) {
        this.isLike = boolean;
        return this.isLike;
    }
    static mapFromDTO(bookDTO: BookDTO): Book {
        return new Book(
            bookDTO.isbn,
            bookDTO.title,
            bookDTO.subtitle,
            bookDTO.author,
            bookDTO.published,
            bookDTO.publisher,
            bookDTO.pages,
            bookDTO.description,
            bookDTO.website,
        )
    }

}