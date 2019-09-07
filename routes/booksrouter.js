var exp = require('express');
const router = exp.Router();   
var bodyparser = require('body-parser');
var books = require('../model/booksmodel');
const path = require('path');

router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());

var multer = require('multer'); //module to upload files

var storage =   multer.diskStorage({  
    destination: (req, file, callback)=>{  
      callback(null, './public/images');  
    },  
    filename: (req, file, callback)=>{  
      callback(null, file.originalname);  
    }  
  });  
  
var upload = multer({ storage : storage}).single('bimage');  

router.get("/getbooks",(req,res)=>{
    books.find({},(err,result)=>{
        if (err) throw err;
        else res.send(result);
    }) 
})


router.post("/add", upload, (req,res)=>{
    if(req.body.bookTitle!=undefined){
        var b1 = new books(req.body);
        b1.save((err)=>{
            if (err) throw err;
            else res.send({msg:"Added"});
        });
    }
})

router.get("/view/:img",(req,res)=>{        //image controller
    res.sendFile(path.join(__dirname+"../../public/images/"+req.params.img));
})


router.post("/edit", upload, (req,res)=>{
    books.updateOne({bookTitle:req.body.bookTitle} ,{$set:{
        bookTitle:req.body.bookTitle,
        author : req.body.author,
        genre : req.body.genre,
        description : req.body.description,
        price : req.body.price,
        urlToImage : req.body.file
    }}, (err,result)=>{
        if (err) throw err;
        else res.send({msg:"Updated"});
    }) 
})

router.get("/delete/:bid",(req,res)=>{
    books.deleteOne({bookTitle:req.params.bid},(err,result)=>{
        if (err) throw err;
        else
        {
            books.find({},(err,result)=>{
                if(err) throw err;
                else res.send(result);
            })
        }
    })
})

router.get("/:id",(req,res)=>{
    books.find({bookTitle:req.params.id},(err,result)=>{
        if (err) throw err;
        else res.send(result[0]);
    })
})

module.exports=router;