const express = require("express");
const router = express.Router();
const usermodel = require("../models/user");


const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    if(req.session)
    {
        req.session.destroy(()=>{
            res.redirect('/login')
        })
    }
});


module.exports = router;
