// const express = require("express");
// const router = express.Router();
// const middleware = require("../../middleware")
// const usermodel = require("../../models/user");
// const Post = require("../../models/post");


// // Set up body-parser
// // const bodyParser = require("body-parser");
// // router.use(bodyParser.urlencoded({ extended: false }));

// // router.get("/", (req, res, next) => {
// //   Post.find()
// //   .populate("postedBy")
// //   .sort({"createdAt": -1})
// //   .then(result =>{
// //     res.status(201).send(result)
// //   }).catch(error=>
// //   {
// //     console.log(error);
// //     res.sendStatus(400);
// //   });
// // });


// router.use(express.json());

// router.get("/", async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .populate("postedBy")
//       .sort({ createdAt: -1 });
//     res.status(200).json(posts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });



const express = require("express");
const router = express.Router();
const usermodel = require("../../models/user");
const Post = require("../../models/post");

// Set up body-parser
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));


router.get("/",async(req,res,next) =>{
  Post.find()
  .then(results=>{
    res.status(201).send(results)
  }).catch(error =>{
    res.status(400).send(error)
  })

})

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.content) {
      return res.status(400).json({ message: "Content parameter missing" });
    }

    const postData = {
      content: req.body.content,
      postedBy: req.session.user
    };


    const newPost = await Post.create(postData);
    const populatedPost = await usermodel.populate(newPost, { path: "postedBy" });

    res.status(201).json(populatedPost);
    console.log(populatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }

});

module.exports = router;


router.put("/:id/like", async (req, res) => {
  console.log(req.params.id);

  var postId = req.params.id;
  var userId = req.session.user._id;
  var isliked = req.session.user.likes && req.session.user.likes.includes(postId);

  var option = isliked ? "$pull" : "$addToSet";

   console.log("is liked :" + isliked);
   console.log("option : " + option);
   console.log("userid: "  + userId);
   console.log("postid : "  + postId);
   console.log(req.session.user._id);
 

  // insert user likes
  req.session.user._id = await Post.findByIdAndUpdate(userId, {[option]:{likes: postId} },{new:true})
  .catch(error =>{
    console.log(error);
    res.sendStatus(400);

  })


  //insert post likes
  var post = await usermodel.findByIdAndUpdate(postId, {[option]:{likes: userId} },{new:true})
  .catch(error =>{
    console.log(error);
    res.sendStatus(400);

  })
  console.log("vdfs........................ff");

 res.status(200).send(post)
});

module.exports = router;
