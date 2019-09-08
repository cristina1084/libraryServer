var exp = require('express');
const router = exp.Router();
var bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());

var user = require('../model/usersmodel');

router.post("/",(req,res)=>{
    user.find({username:req.body.username, password:req.body.password},(err,result)=>{
        if (err) throw err;
        else{
            console.log(result.length);
            if(result.length!=0)
                res.send({found:true})
                
            else
                res.send({found:false})
        }
    })
    
})

module.exports = router;