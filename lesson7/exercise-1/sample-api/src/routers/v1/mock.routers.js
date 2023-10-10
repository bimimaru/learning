/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *
 */

const { Router } = require('express');
const controller = require('../../controllers/mock.book.controller');
const catchAsync = require('../../utils/catchAsync');
const validate = require('../../middlewares/validation.middleware');
const bookValidator = require('../../validations/book.validator');

const router = Router();

router.get('/', validate(bookValidator.getBookByAuthor), catchAsync(controller.getBookHandler));
router.get('/authors', catchAsync(controller.getAuthorsHandler));
router.get('/:id/:isLike', catchAsync(controller.updateLikeStatusOfBookHandler));
router.get('/:id/', validate(bookValidator.getBookById), catchAsync(controller.getBookByIdHandler));

module.exports = { router };
