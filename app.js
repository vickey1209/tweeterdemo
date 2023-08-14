const dotenv = require('dotenv');
dotenv.config()
const multer = require ('multer')
const express = require("express")
const pug = require("pug")

const session = require("express-session")
const path = require("path")
const bodyParser = require("body-parser")
const connectDB = require("./config/connectdb.js")
const app = express()
const middleware = require("./middleware")
const port = process.env.PORT

app.set("view engine" ,"pug");
app.set ("views","views");
app.use(express.static(path.join(__dirname , "public")));
app.use (bodyParser.urlencoded({extended:false}))

app.use(express.static("public"));



//session 
app.use(session({
    secret: "d86fbb1e6d14aa59369f739df2ededc8006a8b53096b68ca8f47e3d69e1f06d1",
    resave: true,
    saveUninitialized: false,
    cookie:{ secure: false , maxAge: 8000
      }
}))

const DATABASE_URL = process.env.DATABASE_URL


//databse connection
connectDB(DATABASE_URL)

//api routes
const postapiroutes = require("./routes/api/posts.js")


//routes
const loginroutes = require("./routes/loginroutes")
const registerroutes = require("./routes/registerroutes")
const logoutroutes =require("./routes/logout.js")
 
app.use("/login", loginroutes)
app.use("/register", registerroutes)
app.use("/logout", logoutroutes)

// posts api routes
app.use("/api/posts",postapiroutes);

// app.get ("/home", middleware.requirelogin,  (req , res , next )=> {
    
//     var payload = {
//         pageTitle: "home",
//         userloggedin : req.session.user
//     }

//     res.status(200).render("home", payload )
// })


app.get("/home", middleware.requirelogin,  (req, res, next) => {
    if (req.session.user) {
        // User is authenticated
        var payload = {
            pageTitle: "Home",
            userloggedin: req.session.user,
        };
        res.status(200).render("home", payload);
        console.log("cdgfg", req.session.user  , payload);
    } else {
        // User is not authenticated, redirect to login
        res.redirect("/");
    }
});



app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})    