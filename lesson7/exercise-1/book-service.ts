import { Book } from "./book";
import axios from "axios";
import { BookDTO } from "./book-dto";
import { API_PATH } from "./api";
axios.defaults.baseURL = "http://localhost:3000";
export class BookService {
    storedBooks: Book[] = []

    //4
    async getBooks(): Promise<Book[]> {//1

        try {
            const result = await axios.get<BookDTO[]>(API_PATH.GET_BOOKS);
            const data = result.data;
            this.storedBooks = []
            for (let i = 0; i < data.length; i++) {
                this.storedBooks.push(Book.mapFromDTO(data[i]))
            }

            return this.storedBooks;
        } catch (e) {
            console.log(e)
        }
    }

    searchBookTitle(name: string) { //5
        let result: Book[] = []
        for (let i = 0; i < this.storedBooks.length; i++) {
            if (this.storedBooks[i].getTitle().includes(name)) {
                result.push(this.storedBooks[i])
            }
        }
        if (result.length == 0) {
            throw new Error("There is no book with that title.")
        } else {
            console.log(result)
        }
        return result
    }

    sortBookByPages() { //2
        this.storedBooks.sort((a, b) => b.getPages() - a.getPages())
        console.log(this.storedBooks)
    }

    searchBookByID(id: string): Book { //7
        let result: Book | undefined;
        for (let i = 0; i < this.storedBooks.length; i++) {
            if (this.storedBooks[i].getID() == id) {
                result = this.storedBooks[i];
                break;
            }
        }
        if (result == undefined) {
            throw new Error("Book is not found.")
        }
        return result;
    }

    async toggleFavoriteBook(bookID: string, favorite: boolean) { //8
        if (this.searchBookByID(bookID)) {
            const result = await axios.get(API_PATH.GET_BOOKS + "/" + bookID + "/" + favorite);
            this.searchBookByID(bookID).setIsLike(favorite)
            //console.log(result.data)
            return result.data
        }
    }

    async getMinPages(minPages: number, limitX: number, offset: number) {//10

        let foundBooks = await axios.get<BookDTO[]>(API_PATH.GET_BOOKS + "?minPages=" + minPages + "&limit=" + limitX + "&offset=" + offset)
        let data = foundBooks.data;

        return data.map((rawValue) => {
            return Book.mapFromDTO(rawValue)
        })
    }

    async getMaxPages(maxPages: number, limitX: number, offset: number) {//11

        let foundBooks = await axios.get<BookDTO[]>(API_PATH.GET_BOOKS + "?maxPages=" + maxPages + "&limit=" + limitX + "&offset=" + offset)
        let data = foundBooks.data;

        return data.map((rawValue) => Book.mapFromDTO(rawValue))
    }

    async getMinAndMaxPages(minNumber: number, maxNumber: number, limitX: number, offset: number | undefined = 0, order: boolean | undefined = undefined) { //12
        // tera condition

        let foundBooks = await axios.get<BookDTO[]>(
            API_PATH.GET_BOOKS +
            "?minPages=" + minNumber +
            "&maxPages=" + maxNumber +
            "&limit=" + limitX +
            "&offset=" + offset +
            (order ? "&order=" + order : "")
        );

        let data = foundBooks.data;

        return data.map((rawValue) => {
            return Book.mapFromDTO(rawValue)
        })
    }

    getLikedBooks() { //9
        const result: Book[] = []
        for (let i = 0; i < this.storedBooks.length; i++) {
            if (this.storedBooks[i].getIsLike() == true) {
                result.push(this.storedBooks[i])
            }
        }
        console.log(result)
        return result;
    }

    async getLastBook() { //17
        let books = await this.getBooks()
        let length = books.length - 1
        let result = await axios.get<BookDTO[]>(API_PATH.GET_BOOKS + "?limit=1&offset=" + length)
        let data = result.data
        return data.map((rawValue) => Book.mapFromDTO(rawValue))
    }
}