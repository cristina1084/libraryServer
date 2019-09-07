var mongo = require('mongoose');

var schema = mongo.Schema;

var authorSchema = new schema({
    author : String,
    urlToImage : String
});

var authorsModel = mongo.model("authors", authorSchema);

module.exports = authorsModel;