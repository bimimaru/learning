import axios from "axios";
import { Author } from "./author";
import { Book } from "./book"
import { BookDTO } from "./book-dto";
import { API_PATH } from "./api";
import { AuthorDTO } from "./author-dto";

axios.defaults.baseURL = "http://localhost:3000";

let storedBooks: Book[] = []; //4
async function getBooks(): Promise<Book[]> {//1
    try {
        const result = await axios.get<BookDTO[]>(API_PATH.GET_BOOKS);
        const data = result.data;
        storedBooks = []
        for (let i = 0; i < data.length; i++) {
            storedBooks.push(Book.mapFromDTO(data[i]))
        }

        return storedBooks;
    } catch (e) {
        console.log(e)
    }
}

let storedAuthors: Author[] = []; //4
async function getAuthors(): Promise<Author[]> {
    try {
        const result = await axios.get<AuthorDTO[]>(API_PATH.GET_AUTHORS);
        const data = result.data;
        storedAuthors = []
        for (let i = 0; i < data.length; i++) {
            storedAuthors.push(Author.mapFromDTO(data[i]))
        }
        return storedAuthors;
    } catch (e) {
        console.log(e)
    }
}

function searchBookTitle(name: string) { //5
    let result: Book[] = []
    for (let i = 0; i < storedBooks.length; i++) {
        if (storedBooks[i].getTitle().includes(name)) {
            result.push(storedBooks[i])
        }
    }
    if (result.length == 0) {
        throw new Error("There is no book with that title.")
    } else {
        console.log(result)
    }
    return result
}

function sortBookByPages() { //2
    storedBooks.sort((a, b) => b.getPages() - a.getPages())
    console.log(storedBooks)
}

function findBooksForEachAuthor() { //3
    const result = {}
    for (let i = 0; i < storedAuthors.length; i++) {
        let foundBooks: Book[] = []
        for (let j = 0; j < storedBooks.length; j++) {
            //console.log(storedAuthors[i])
            if (storedAuthors[i].getAuthor() == storedBooks[j].getAuthor()) {
                foundBooks.push(storedBooks[j])
            }
        }
        result[storedAuthors[i].getAuthor()] = foundBooks;
    }
    console.log("==========", result)
    return result;
}

function searchBookByID(id: string): Book { //7
    let result: Book | undefined;
    for (let i = 0; i < storedBooks.length; i++) {
        if (storedBooks[i].getID() == id) {
            result = storedBooks[i];
            break;
        }
    }
    if (result == undefined) {
        throw new Error("Book is not found.")
    }
    return result;
}

async function toggleFavoriteBook(bookID: string, favorite: boolean) { //8
    if (searchBookByID(bookID)) {
        const result = await axios.get(API_PATH.GET_BOOKS + "/" + bookID + "/" + favorite);
        searchBookByID(bookID).setIsLike(favorite)
        //console.log(result.data)
        return result.data
    }
}

async function getMinPages(minPages: number, limitX: number) {//10
    let result: Book[] = []
    let foundBooks = await axios.get<BookDTO[]>(API_PATH.GET_BOOKS + "?minPages=" + minPages)
    let data = foundBooks.data;
    for (let i = 0; i < data.length; i++) {
        if (i <= limitX) {
            result.push(Book.mapFromDTO(data[i]))
        } else {
            break;
        }
    }
    //console.log(result)
    return result
}
async function getMaxPages(maxPages: number, limitX: number) {//11
    let result: Book[] = []
    let foundBooks = await axios.get<BookDTO[]>(API_PATH.GET_BOOKS + "?maxPages=" + maxPages)
    let data = foundBooks.data;
    for (let i = 0; i < data.length; i++) {
        if (i <= limitX) {
            result.push(Book.mapFromDTO(data[i]))
        } else {
            break;
        }
    }
    //console.log(result)
    return result
}
async function getMinAndMaxPages(minNumber: number, maxNumber: number, limitX: number) { //12
    let result: Book[] = []
    let minPages = await getMinPages(minNumber, limitX)
    let maxPages = await getMaxPages(maxNumber, limitX)
    console.log(minPages, "++++++", maxPages)
    for (let i = 0; i < minPages.length; i++) {
        for (let j = 0; j < maxPages.length; j++) {
            if (minPages[i].getID() == maxPages[j].getID()) {
                result.push(maxPages[j])
            }
        }
    }
    console.log("=====", result)
    return result;
}

function getLikedBooks() { //9
    const result: Book[] = []
    for (let i = 0; i < storedBooks.length; i++) {
        if (storedBooks[i].getIsLike() == true) {
            result.push(storedBooks[i])
        }
    }
    console.log(result)
    return result;
}

async function run() {
    await getBooks();
    await getAuthors();

    setInterval(() => { //6
        getBooks();
        getAuthors();
        //getLikedBooks()
    }, 5000);

    // try {
    //     searchBookTitle("Harry Potter");
    // } catch (e) {
    //     console.log(e)
    // }

    //findBooksForEachAuthor()
    //sortBookByPages()

    // try {
    //     searchBookByID("97814919435")
    // } catch (e) {
    //     console.log(e)
    // }

    // try {
    //     await toggleFavoriteBook("9781593277574", true)
    // } catch (e) {
    //     console.log(e)
    // }

    // getLikedBooks()

    getMinAndMaxPages(200, 400, 5)
}

run();


