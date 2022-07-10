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
      return Promise.resolve({status:500, errMessage:e.message});
    }
    
  }

  updateBook = async (id, book) => {
    try {
      const currentBook = await this.books.findOneAndUpdate({ id: id }, book, {new: true});
      return Promise.resolve(currentBook);
    } catch (e) {
      return Promise.resolve({status:500, errMessage:e.message});
    }
  }

  getBook = async (id) => {
    try {
      const book = await this.books.findOne({id: id}).select('-__v');
      return Promise.resolve(book);
    } catch (e) {
      return Promise.resolve({status:500, errMessage: e.message});
    }
  }

  getAllBooks = async () => {
    try {
      return Promise.resolve(await this.books.find());
    } catch (e) {
      return Promise.resolve({status:500, errMessage:e.message});
    }
  }

  removeBook = async (id) => {
    try {
      const book = await this.books.deleteOne({id: id});
      return Promise.resolve(book.deletedCount > 0 ? true : false);
    } catch (e) {
      return Promise.resolve({status:500, errMessage:e.message});
    }
  }

}
