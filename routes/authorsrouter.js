var exp = require('express');
const router = exp.Router();    

var authors = require('../model/authorsmodel');

router.get("/getauthors",(req,res)=>{
    authors.find({},(err,result)=>{
        if (err) throw err;
        else res.send(result)
    }) 
})

router.get("/:id",(req,res)=>{
    authors.find({author: req.params.id},(err,result)=>{
        if (err) throw err;
        else res.send(result[0])
    })
})


module.exports=router;