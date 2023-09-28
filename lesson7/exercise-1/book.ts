import { Author } from "./author"

export class Book {
    private isbn: string
    private title: string
    private subtitle: string
    private author: Author
    private published: Date
    private publisher: string
    private pages: number
    private description: string
    private website: string
    constructor(isbn: string, title: string, subtitle: string, author: Author, published: Date, publisher: string, pages: number, description: string, website: string) {
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
    public getAuthor(): Author {
        return this.author;
    }
    public getID(): string {
        return this.isbn;
    }

}