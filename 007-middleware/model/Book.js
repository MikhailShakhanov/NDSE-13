const uuid = require('uuid');

class Book {
  constructor({ title, description, authors, favorite, fileCover, fileName, fileBook }) {
    this.id = uuid.v4();
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
  }
}

class Library {
  constructor() {
    this.books = [];
  };

  addBook = async (book) => { 
    const newBook = new Book(book);
    this.books.push(newBook);
    return Promise.resolve(newBook);
  }
  updateBook = async (id, book) => {
    const currentBook = this.books.find((item) => item.id === id);

    if (currentBook) {
      Object.assign(currentBook, book);
    }
    return Promise.resolve(currentBook);
  }
 getBook = async (id) => {
    const book = this.books.find((item) => item.id === id);
    return Promise.resolve(book);
  }

  getAllBooks = async () => {
    return Promise.resolve(this.books);
  }

  removeBook = async (id) => {
    const indexRemoveBook = this.books.findIndex((item) => item.id === id);
    if (indexRemoveBook !== -1) this.books.splice(indexRemoveBook, 1);
    return Promise.resolve(indexRemoveBook > -1 ? true : false);
  }
}

const books = new Library();
module.exports = books;
