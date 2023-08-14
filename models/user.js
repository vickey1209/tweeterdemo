const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  
 
    firstname:{
       type: String,
       required: true,
       trim:true
    },
    lastname:{
        type: String,
        required: true,
        trim:true
     },
     username:{
        type: String,
        required: true,
        trim:true,
        unique: true
     },
   
     email: {
        type: String,
        required: true,
        unique: true,
        validate: {         
          validator: function (value) {
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
          },
          message: (props) => `${props.value} is not a valid email address!`,
        },
      },
    password:{
        type: String,
        required: true,
        trim:true

    },
    confirmpassword:{
        type: String,
        require: true,
        trim:true

    },
    profilepicture: {
      type: String,
      default:"/images/pic.jpg",
      required: false,
    },
    likes:[{type: Schema.Types.ObjectId, 
      ref:"Post"}],
    },{timestamps:true}


)

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};


const usermodel = mongoose.model("User", userSchema  )
module.exports = usermodel;