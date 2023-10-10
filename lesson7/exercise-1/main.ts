import * as axios from "axios";
import { Author } from "./author";
import { Book } from "./book"
import { BookDTO } from "./book-dto";
import { API_PATH } from "./api";
import { AuthorDTO } from "./author-dto";
import { BookService } from "./book-service";
import { AuthorService } from "./author-service";

const bookService = new BookService();
const authorService = new AuthorService();
// bookServices.getBooks()
async function run() {
    await bookService.getBooks();
    await authorService.getAuthors();

    setInterval(() => { //6
        bookService.getBooks();
        authorService.getAuthors();
        //getLikedBooks()
    }, 5000);

    try {
        bookService.searchBookTitle("Harry Potter");
    } catch (e) {
        console.log(e)
    }

    authorService.findBooksForEachAuthor(bookService.storedBooks)
    bookService.sortBookByPages()

    try {
        bookService.searchBookByID("97814919435")
    } catch (e) {
        console.log(e)
    }

    try {
        await bookService.toggleFavoriteBook("9781593277574", true)
    } catch (e) {
        console.log(e)
    }

    bookService.getLikedBooks()

    bookService.getMinAndMaxPages(200, 400, 5)


    //15.  Get books has pages from 100 -> 500 sorted by published date descending and limit by 3
    console.log(await bookService.getMinAndMaxPages(100, 500, 3, 0, false))

    //16
    console.log(await bookService.getMinAndMaxPages(300, 400, 3, 1, false))

    //17
    console.log(await bookService.getLastBook())
}

run();