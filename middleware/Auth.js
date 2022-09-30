const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;
const UserModel = require('../model/userModel');


module.exports = async (req, res, next) => {
   try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (token == null) {
         return res.status(401).json({ message: "Token is missing" });
      } else {
         const varifyToken = jwt.verify(token, secret_key);

         // console.log(varifyToken._id);
         // console.log(varifyToken);

         const rootUser = await UserModel.findOne({ _id: varifyToken._id, "tokens.token": token });
         if (!rootUser) {
            throw new Error("User not found");
         }
         req.token = token;
         req.rootUser = rootUser;
         req.userId = rootUser._id;

         next();
      }
   } catch (error) {
      res.status(401).send("Unauthorized:No token provided");
      console.log(error);
   }
}
