import * as axios from "axios";
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

async function getMinPages(minPages: number, limitX: number, offset: number) {//10

    let foundBooks = await axios.get<BookDTO[]>(API_PATH.GET_BOOKS + "?minPages=" + minPages + "&limit=" + limitX + "&offset=" + offset)
    let data = foundBooks.data;

    return data.map((rawValue) => {
        return Book.mapFromDTO(rawValue)
    })
}

async function getMaxPages(maxPages: number, limitX: number, offset: number) {//11

    let foundBooks = await axios.get<BookDTO[]>(API_PATH.GET_BOOKS + "?maxPages=" + maxPages + "&limit=" + limitX + "&offset=" + offset)
    let data = foundBooks.data;

    return data.map((rawValue) => Book.mapFromDTO(rawValue))
}

async function getMinAndMaxPages(minNumber: number, maxNumber: number, limitX: number, offset: number | undefined = 0, order: boolean | undefined = undefined) { //12
    // tera condition

    let foundBooks = await axios.get<BookDTO[]>(
        API_PATH.GET_BOOKS +
            "?minPages=" + minNumber +
            "&maxPages=" + maxNumber +
            "&limit=" + limitX +
            "&offset=" + offset +
            order ? "&order=" + order : ""
    );

    let data = foundBooks.data;

    return data.map((rawValue) => {
        return Book.mapFromDTO(rawValue)
    })
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

async function getLastBook() { //17
    let books = await getBooks()
    let length = books.length - 1
    let result = await axios.get<BookDTO[]>(API_PATH.GET_BOOKS + "?limit=1&offset=" + length)
    let data = result.data
    return data.map((rawValue) => Book.mapFromDTO(rawValue))
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

    // getMinAndMaxPages(200, 400, 5)


    //15.  Get books has pages from 100 -> 500 sorted by published date descending and limit by 3
    //console.log(await getMinAndMaxPages(100, 500, 3, 0, false))

    //16
    //console.log(await getMinAndMaxPages(300, 400, 3, 1, false))

    //17
    console.log(await getLastBook())
}
run();



