use library
db.books.insertMany([{title:"Евгений Онегин", authors:"Пушкин А.С.", description:"Роман"}, {title:"Мартин Иден", authors:"Джек Лондон", description:"Приключения"}])
db.books.find({title:"Мартин Иден"})
db.books.updateOne({_id:ObjectId("62c01b3970bda451221f7e9b")}, {$set:{authors:"Jack London", description:"Novel"}})