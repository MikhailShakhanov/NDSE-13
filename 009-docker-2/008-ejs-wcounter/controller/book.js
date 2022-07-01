const Library = require('../model/Book');
const express = require('express');
const fetch = require('node-fetch');
//require('dotenv').config();
const fileMulter = require('../middleware/file');
const config = require('../config');

const counterUrl = process.env.COUNTER_URL || 'localhost:4000';

const invokeCounter = async (urlService, id, method) => {
  const url = `http://${urlService}/counter/${id}/${
    method === 'GET' ? '' : 'incr'
  }`;
  const options = {
    method: method,
  };

  const response = await fetch(url, options);
  return await response.json();
};

const router = express.Router();

const library = new Library();

router.get('/', async function (req, res) {
  const books = await library.getAllBooks();
  res.render('books/index', {
    title: 'Book',
    books: books,
  });
});

router.get('/create', (req, res) => {
  res.render('books/create', {
    title: 'Books | create',
    book: {},
  });
});

router.get('/update/:id', async function (req, res) {
  const { id } = req.params;
  const book = await library.getBook(id);

  if (book) {
    res.render('books/update', {
      title: 'Book',
      book: book,
    });
  } else {
    res.status(404);
    res.json({ errCode: 404, errMsg: 'Книга не найдена' });
  }
});

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const book = await library.getBook(id);

  if (book) {
    await invokeCounter(counterUrl, id, 'POST');
    const counter = await invokeCounter(counterUrl, id, 'GET');

    res.render('books/view', {
      title: 'Book',
      book: book,
      counter: counter.counter,
    });
  } else {
    res.status(404);
    res.json({ errCode: 404, errMsg: 'Книга не найдена' });
  }
});

router.get('/:id/download', async function (req, res) {
  const { id } = req.params;
  const book = await library.getBook(id);

  if (book) {
    res.download(book.fileBook, function (err) {
      if (err) {
        res.status(503);
        res.json({ errCode: 503, errMsg: err });
      }
    });
  } else {
    res.status(404);
    res.json({ errCode: 404, errMsg: 'Книга не найдена' });
  }
});

router.post('/create', fileMulter.single('book-file'), async (req, res) => {
  const { title, description, authors, favorite, fileCover } = req.body;
  const fileName = req?.file.originalname;
  const fileBook = `${config.UPLOAD_PATH}/${req?.file.filename}`;

  const newBook = {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  };
  const addedBook = await library.addBook(newBook);
  res.redirect(`/${config.ROOT_URL}/books`);
});

router.post('/update/:id', fileMulter.single('book-file'), (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover } = req.body;
  const bookForUpdate = {
    title,
    description,
    authors,
    favorite,
    fileCover,
  };
  const bookUpdated = library.updateBook(id, bookForUpdate);
  if (bookUpdated) {
    res.redirect(`/${config.ROOT_URL}/books/${id}`);
  } else {
    res.status(404);
    res.json({ errCode: 404, errMsg: 'Книга не найдена' });
  }
});

router.post('/delete/:id', async function (req, res) {
  const { id } = req.params;
  const resRemove = await library.removeBook(id);

  if (resRemove) {
    res.redirect(`/${config.ROOT_URL}/books`);
  } else {
    res.status(404);
    res.json({ errCode: 404, errMsg: 'Книга не найдена' });
  }
});

module.exports = router;
