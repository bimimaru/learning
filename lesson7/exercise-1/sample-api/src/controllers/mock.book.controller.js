const mockBooks = require('../data/books.json');
const mockAuthors = require('../data/authors.json');

async function getBookHandler(_req, _res) {

    let books;

    const {
        minPages,
        maxPages,
        order,
        limit,
        offset
    } = _req.query;

    books = mockBooks
        .filter(book => book.pages >= minPages && book.pages <= maxPages)
        .slice(offset, offset + limit)
        .sort(
            (book1, book2) => {
                if (order !== null) {
                    const book1Date = new Date(book1.published.replace(/\s/g, '')).getTime();
                    const book2Date = new Date(book2.published.replace(/\s/g, '')).getTime();
                    return order ? book1Date - book2Date : book2Date - book1Date
                } else {
                    return 0
                }
            }
        )

    _res.json(books);
}

async function getAuthorsHandler(_req, _res) {
    _res.json(mockAuthors);
}

function getBookById(id) {
    const book = mockBooks.find((book) => book.isbn === id.toString());

    return book;
}

async function updateLikeStatusOfBookHandler(_req, _res) {
    const { id, isLike } = _req.params;

    const book = getBookById(id);
    if (book) {
        book.isLike = isLike === 'true';
        _res.json(book);
    } else {
        _res.status(404).json({
            message: 'Book not found!',
        });
    }

    return book;
}

async function getBookByIdHandler(_req, _res) {
    const { id } = _req.params;
    const book = getBookById(id);
    if (book) {
        _res.json(book);
    } else {
        _res.status(404).json({
            message: 'Book not found!',
        });
    }
}

module.exports = {
    getBookHandler, updateLikeStatusOfBookHandler, getBookByIdHandler, getAuthorsHandler,
};
