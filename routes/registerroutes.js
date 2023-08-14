const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usermodel = require("../models/user");
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require("path");
const router = express.Router();

app.set("view engine", "pug");
app.set("views", "views");

// Use bodyParser middleware for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "uploads")));

const upload = multer({
  dest: "uploads/",
});

router.get("/", (req, res, next) => {
  res.render("register");
});

router.post("/", upload.single('profilepicture'), async (req, res, next) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    confirmpassword,
  } = req.body;

  const file = req.file;

  const existingUser = await usermodel.findOne({ email: email });
  if (existingUser) {
    return res.send({ status: "failed", message: "Email already exists" });
  }

  if (firstname && lastname && username && email && password && confirmpassword) {
    if (password === confirmpassword) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new usermodel({
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          password: hashedPassword,
          profilepicture: file ? file.buffer : undefined,
        });

        await user.save()
        .then((user)=>{
          req.session.user = user;  
          return res.redirect("/")
          console.log("User registered:", user);
        })
  
        // req.session.saveduser = user;
        // return res.redirect("login");
      } catch (error) {
        console.log(error);
        return res.send({ status: "failed", message: "Unable to register" });
      }
    } else {
      return res.send({
        status: "failed",
        message: "Password and confirm password do not match",
      });
    }
  } else {
    return res.send({ status: "failed", message: "All fields are required" });
  }
});

module.exports = router;






