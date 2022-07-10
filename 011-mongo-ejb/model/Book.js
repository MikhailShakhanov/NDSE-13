const uuid = require('uuid');
const {Schema, model} = require('mongoose');
const connection = require('../libs/connection');

const bookSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  authors: {
    type: String,
    default: "",
  },
  favorite: {
    type: String,
    default: 'off',
  },
  fileCover: {
    type: String,
    default: "",
  },
  fileName: {
    type: String,
    default: "",
  },
  fileBook: {
    type: String,
    default: "",
  },

})



/*class Book { 
  constructor({ title, description, authors, favorite, fileCover, fileName, fileBook } = {}) {
    this.id = uuid.v4();
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
  }
}*/

module.exports = class Library {  
  constructor() {     
    this.books = connection.model('Book', bookSchema);
  };

  addBook = async (book) => {  
    const newBook = new this.books({...book, id: uuid.v4()}); 

    try {
      await newBook.save();
      return Promise.resolve(newBook);
    } catch (e) {
      return Promise.resolve({status:500, errMessage:e});
    }
    
  }
  updateBook = async (id, book) => {
    
    //const currentBook = this.bookModel.find((item) => item.id === id);
    const currentBook = await this.books.updateOne({ id: id }, book);
    //const currentBook = this.books.findById(id).select('-__v');
    //if (currentBook) {
    //  Object.assign(currentBook, book);
    //}
    console.log(currentBook);
    return Promise.resolve(currentBook);
  }
 getBook = async (id) => {
    //const book = this.books.find((item) => item.id === id);
    const book = this.books.findOne({id: id}).select('-__v');
    return Promise.resolve(book);
  }

  getAllBooks = async () => {
    return Promise.resolve(await this.books.find());
  }

  removeBook = async (id) => {
    //const indexRemoveBook = this.books.findIndex((item) => item.id === id);
    //if (indexRemoveBook !== -1) this.books.splice(indexRemoveBook, 1);
    //return Promise.resolve(indexRemoveBook > -1 ? true : false);
  }
}
