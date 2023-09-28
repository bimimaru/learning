import { Author } from "./author";
import { Book } from "./book"

let storedBooks: Book[] = []; //4
async function getBooks(): Promise<Book[]> {
    const result = await fetch("http://localhost:3000/api/v1/books");
    const books = await result.json();
    storedBooks = books;
    //console.log(storedBooks) // 1
    return storedBooks;
}
let storedAuthors: Author[] = []; //4
async function getAuthors(): Promise<Author[]> {
    const result = await fetch("http://localhost:3000/api/v1/books/authors");
    const authors = await result.json();
    storedAuthors = authors;
    //console.log(storedAuthors)
    return storedAuthors;
}

getBooks();
getAuthors();
setInterval(() => { //6
    getBooks();
    getAuthors();
}, 10000)

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
// try {
//     searchBookTitle();
// } catch (e) {
//     console.log(e)
// }


// function sortBookByPages() { //2
//     console.log(storedBooks)
//     storedBooks.sort((a, b) => a.getPages() - b.getPages())
//     console.log(storedBooks)

// }
//sortBookByPages()

function findBooksForEachAuthor() { //3
    const result = {}
    for (let i = 0; i < storedAuthors.length; i++) {
        let foundBooks: Book[] = []
        for (let j = 0; j < storedBooks.length; j++) {
            if (storedAuthors[i] == storedBooks[j].getAuthor()) {
                foundBooks.push(storedBooks[j])
            }
        }
        result[storedAuthors[i].getAuthor()] = foundBooks;
    }
    console.log("==========", result)
    return result;
}

findBooksForEachAuthor()

function searchBookByID(id: string) {
    let result: Book | undefined;
    for (let i = 0; i < storedBooks.length; i++) {
        if (storedBooks[i].getID() == id) {
            result = storedBooks[i];
            break;
        }
    }
    if (result == undefined) {
        throw new Error("There is no book with that ID.")
    }
    return result;
}

try {
    searchBookByID("9781491943533")
} catch (e) {
    console.log(e)
}