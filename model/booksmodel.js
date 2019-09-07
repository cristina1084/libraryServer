var mongo = require('mongoose');

var schema = mongo.Schema;

var bookSchema = new schema({
    bookTitle : String,
    author : String,
    genre : String,
    description : String,
    price : Number,
    urlToImage : String
});

var booksModel = mongo.model("books", bookSchema);

module.exports = booksModel;