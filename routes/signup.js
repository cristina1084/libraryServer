var exp = require('express');
const router = exp.Router();
var user = require('../model/usersmodel');
var bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());

router.get("/",(req,res)=>{
    res.render(
        "signup",
        {
            pageTitle:"Library",
            nav:[
                {link:"/signup", title:"Sign Up"},
                {link:"/login", title:"Login"}
            ]
        })
})

router.post("/",(req,res)=>{
    var u1 = new user();
    u1.name = req.body.name;
    u1.email = req.body.email;
    u1.mobile = req.body.mobile;
    u1.role = req.body.role;
    u1.username = req.body.username;
    u1.password = req.body.password;
    u1.save((err)=>{
        if (err) throw err;
        else{
            console.log("Data added");
            res.redirect("/login");
        }
    })
})

module.exports = router;