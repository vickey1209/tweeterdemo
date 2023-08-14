const express = require("express");
const router = express.Router();
const usermodel = require("../models/user");
const middleware = require("../middleware");
const bcrypt = require('bcrypt');
const session = require("express-session");

// Set up body-parser
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));



// Login route
router.get("/", (req, res, next) => {
    res.status(200).render("login");
});
 
router.post("/", async (req, res, next) => {
    const email = req.body.logusername; 
    const loginpassword = req.body.logpassword;

    try {
        if (email && loginpassword) {
            const user = await usermodel.findOne({ email: email });
            if (user) {
                const result = await bcrypt.compare(loginpassword, user.password);

             if (result) {
                    
                    req.session.user = user;

                    // Redirect to the authenticated route
                    res.redirect("/home");
             
                    console.log("user logged in", user);
               
            
                } else {
                    res.status(200).render("login", { errormessage: "Invalid username or password" });
                }
            } else {
                res.status(200).render("login", { errormessage: "User not found" });
            }
        } else {
            res.status(200).render("login", { errormessage: "Please provide both username and password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).render("error", { errormessage: "Something went wrong" });
    }
});



module.exports = router;











// const express = require("express");
// const router = express.Router();
// const usermodel = require("../models/user");
// const middleware = require("../middleware")
// const bcrypt = require('bcrypt');
// const session = require("express-session")


// // Set up body-parser
// const bodyParser = require("body-parser");
// router.use(bodyParser.urlencoded({ extended: false }));

// // router.use(middleware.requirelogin)


// //session 
// router.use(session({
//     secret: "d86fbb1e6d14aa59369f739df2ededc8006a8b53096b68ca8f47e3d69e1f06d1",
//     resave: true,
//     saveUninitialized: false,
//     cookie:{ secure: false , maxAge: 8000
//       }
// }))

// router.get("/", (req, res, next) => {
//     res.status(200).render("login");
// });


// router.get ("/", middleware.requirelogin,  (req , res , next )=> {
    
//     var payload = {
//         pageTitle: "home",
//         userloggedin : req.session.user
//     }

//     res.status(200).render("home", payload)
// })




// router.post("/", async (req, res, next) => {
//     const email = req.body.logusername; 
//     const loginpassword = req.body.logpassword;

//     try {
//         if (email && loginpassword) {
//             const user = await usermodel.findOne({ email: email });
//             if (user) {
//                 const result = await bcrypt.compare(loginpassword, user.password);
//                 if (result) {
//                 req.session.user = user; 
//                     res.redirect("/")

//                     console.log("user logged in", user);
                
//                 } else {
//                     res.status(200).render("login", { errormessage: "Invalid username or password" });
//                 }
//             } else {
//                 res.status(200).render("login", { errormessage: "User not found" });
//             }
//         } else {
//             res.status(200).render("login", { errormessage: "Please provide both username and password" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).render("error", { errormessage: "Something went wrong" });
//     }
// });




// module.exports = router;
