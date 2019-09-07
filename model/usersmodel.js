var mongo = require('mongoose');

var schema = mongo.Schema;

var userSchema = new schema({
    name : String,
    email : String,
    mobile : Number,
    role : String,
    username : String,
    password : String
});

var usersModel = mongo.model("users", userSchema);

module.exports = usersModel;