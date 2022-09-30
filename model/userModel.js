const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const secret_key=process.env.SECRET_KEY;

const userSchema = new mongoose.Schema({
   uName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   tokens:[
      {
         token:{
            type:String,
            required:true
         }
      }
   ]
});


// generating token
userSchema.methods.generatAuthToken=async function(){
    try {
      let token =jwt.sign({_id:this._id},secret_key,{
          expiresIn:"7d"
      });
      this.tokens=this.tokens.concat({token:token});
      await this.save();
      return token;
    } catch (error) {
       console.log(error)
    }
}


module.exports = mongoose.model("user", userSchema);
