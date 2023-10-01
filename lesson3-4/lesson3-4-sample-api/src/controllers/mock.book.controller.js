const bookService = require('../services/book.service');
const mockBooks = require('../data/books.json');
const mockAuthors = require('../data/authors.json');

async function getBookHandler(_req, _res) {
    _res.json(mockBooks);
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
