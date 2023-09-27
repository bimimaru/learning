const bookService = require('../services/book.service');
const mockBooks = require('../data/books.json');
const mockAuthors = require('../data/authors.json');

async function getBookHandler(_req, _res) {
  // const { author } = _req.query;
  // await bookService.createBooks();
  // _res.json(await bookService.getBooksGroupedByAuthor(author));

  _res.json(mockBooks);
}

async function getAuthorsHandler(_req, _res) {
  _res.json(mockAuthors);
}

async function updateLikeStatusOfBookHandler(_req, _res) {
  const { isLike } = _req.body;
  const { id } = _req.params;
  _res.json(await bookService.updateLikeStatusOfBook(parseInt(id, 10), isLike));
}

async function getBookByIdHandler(_req, _res) {
  const { id } = _req.params;
  _res.json(await bookService.getBookById(parseInt(id, 10)));
}

module.exports = {
  getBookHandler, updateLikeStatusOfBookHandler, getBookByIdHandler, getAuthorsHandler,
};
