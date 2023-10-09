import axios from "axios";
import { Author } from "./author";
import { Book } from "./book"
import { API_PATH } from "./api";
import { AuthorDTO } from "./author-dto";
axios.defaults.baseURL = "http://localhost:3000";

export class AuthorService {
    storedAuthors: Author[] = []; //4

    async getAuthors(): Promise<Author[]> {

        try {
            const result = await axios.get<AuthorDTO[]>(API_PATH.GET_AUTHORS);
            const data = result.data;
            this.storedAuthors = []
            for (let i = 0; i < data.length; i++) {
                this.storedAuthors.push(Author.mapFromDTO(data[i]))
            }
            return this.storedAuthors;
        } catch (e) {
            console.log(e)
        }
    }


    findBooksForEachAuthor(storedBooks: Book[]) { //3
        const result = {}
        for (let i = 0; i < this.storedAuthors.length; i++) {
            let foundBooks: Book[] = []
            for (let j = 0; j < storedBooks.length; j++) {
                //console.log(storedAuthors[i])
                if (this.storedAuthors[i].getAuthor() == storedBooks[j].getAuthor()) {
                    foundBooks.push(storedBooks[j])
                }
            }
            result[this.storedAuthors[i].getAuthor()] = foundBooks;
        }
        console.log("==========", result)
        return result;
    }
}