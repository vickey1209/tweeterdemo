const mongoose = require("mongoose");
const usermodel = require("../models/user");

const Schema = mongoose.Schema;
const postSchema = new Schema({
  
 
    content:{
       type: String,
       trim:true
    },
    

    postedBy:{
        type: Schema.Types.ObjectId, 
        ref:"User",
     },
     pinned:Boolean,
     likes:[{type: Schema.Types.ObjectId, 
      ref:"User"}],},
     {timestamps:true});
    




const postmodel = mongoose.model("Post", postSchema )
module.exports = postmodel;