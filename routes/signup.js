var exp = require('express');
const router = exp.Router();
var user = require('../model/usersmodel');
var bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());

router.post("/",(req,res)=>{
    var u1 = new user(req.body);
    u1.save((err)=>{
        if (err) throw err;
        else res.send({msg:"User Created"});
    })
})

router.get("/:uid",(req,res)=>{
    user.find({username:req.params.uid},(err,result)=>{
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