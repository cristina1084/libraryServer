var exp = require('express');
const router = exp.Router();
var bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());

var user = require('../model/usersmodel');

router.get("/",(req,res)=>{
    res.render(
        "login",
        {
            pageTitle:"Library",
            nav:[
                {link:"/signup", title:"Sign Up"},
                {link:"/", title:"Login"}
            ]
        }
    )
})

router.post("/",(req,res)=>{
    user.find({username:req.body.uname, password:req.body.pwd},(err,result)=>{
        if (err) throw err;
        else{
            console.log(result.length);
            if(result.length!=0)
                res.redirect("/index");
                
            else
                res.redirect("/login");
        }
    })
    
})

module.exports = router;