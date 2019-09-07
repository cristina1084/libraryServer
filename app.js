const exp = require('express');
const app = exp();
 
const path = require('path');
//var bodyparser = require('body-parser');

var bookrouter = require('./routes/booksrouter');
var authorrouter = require('./routes/authorsrouter');
var signuprouter = require('./routes/signup');
var loginrouter = require('./routes/login');

var mongo = require('mongoose');
var url = "mongodb+srv://cristina1084:Cristina1084@cluster0-qjdmb.mongodb.net/library?retryWrites=true&w=majority";

mongo.connect(url, {useNewUrlParser:true}, (err)=>{
    if (err) throw err;
    else console.log("Database connected");
})
//app.use(bodyparser.urlencoded({extended:true}));

app.use(exp.static(path.join(__dirname+"/public")));    //sending static files

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use("/books", bookrouter);

app.use("/authors",authorrouter);

app.use("/signup", signuprouter);

app.use("/login", loginrouter);


app.listen(process.env.PORT || 8080,()=>{
    console.log("Listening");
})
