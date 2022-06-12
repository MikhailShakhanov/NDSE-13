const library = require('../model/Book');
const express = require('express');

const router = express.Router();

router.get('/books/:id', async function (req, res) {
  const { id } = req.params;
  const book = await library.getBook(id);

  if (book) {
    res.json(book);
  } else {
    res.status(404);
    res.json('Книга не найдена');
  }
});

router.get('/books', async function (req, res) {
  const books = await library.getAllBooks();
  if (books) {
    res.json(books);
  } else {
    res.status(404);
    res.json('Книга не найдена');
  }
});

router.post('/books', async function (req, res) {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const newBook = {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  };
  const addedBook = await library.addBook(newBook);
  res.status(201);
  res.json(addedBook);
});

router.put('/books/:id', async function (req, res) {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const bookForUpdate = {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  };
  const bookUpdated = await library.updateBook(id, bookForUpdate);
  if (bookUpdated) {
    res.json(bookUpdated);
    res.status(201);
  } else {
    res.status(404);
    res.json('Книга не найдена');
  }
});

router.delete('/books/:id', async function (req, res) {
  const { id } = req.params;
  const resRemove = await library.removeBook(id);

  if (resRemove) {
    res.json('Ok');
  } else {
    res.status(404);
    res.json('Книга не найдена');
  }
});

router.post('/user/login', function (req, res) {
  const loginResult = { id: 1, mail: 'test@mail.ru' };
  res.status(201);
  res.json(loginResult);
});

module.exports = router;
