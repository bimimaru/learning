const joi = require('joi');

const getBookById = {
  params: joi.object().keys({
    id: joi.number().min(0).required(),
  }),
};

const getBookByAuthor = {
  query: joi.object().keys({
    author: joi.string().optional(),
    minPages: joi.number().optional().default(Number.MIN_VALUE),
    maxPages: joi.number().optional().default(Number.MAX_VALUE),
    order: joi.boolean().optional().default(null),
    limit: joi.number().optional().default(10),
    offset: joi.number().optional().default(0)
  }),
};

const updateLikeStatus = {
  body: joi.object().keys({
    isLike: joi.boolean().required(),
  }),
};

module.exports = { getBookById, getBookByAuthor, updateLikeStatus };
