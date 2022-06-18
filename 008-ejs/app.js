const express = require('express');
const app = express();

const errorMiddleware = require('./middleware/error');

const bookRouter = require('./controller/book');
const indexRouter = require('./controller/index');
const userRouter = require('./controller/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/api/books', bookRouter);
app.use('/', indexRouter);
app.use('/api/user', userRouter);

app.use(errorMiddleware);

module.exports = app;
