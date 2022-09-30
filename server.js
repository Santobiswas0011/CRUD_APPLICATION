require("dotenv").config();
const express =require("express");
const app=express();
const PORT =process.env.PORT || 6547;
const cors=require('cors');
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
const cookieParser = require('cookie-parser');

const userRouter=require('./Router/userRouter');

app.use(cors());
app.use(cookieParser(""));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/uploads",express.static("./uploads"));

// for deployment

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}


app.use(userRouter);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
     console.log("Database is connected");
     app.listen(PORT, () => {
          console.log(`http://localhost:${PORT}`)
     });
}).catch((err) => {
     console.log(err.message);
});


/* 
1.REACT_REDUX_ADD_TO_CART -----> https://github.com/harsh17112000/react_redux_cart_youtube

  2.MERN_STACK_CRUD_APPLICATION -----> https://github.com/kunaltyagi9/MERN-Stack-Projects/tree/master/CRUD-Application

  3.MERN_STACK_AMAZON_CLONE -------> https://github.com/harsh17112000/E-commerceapp
  
  4.MERN_STACK_FLIPKART_CLONE  ---------> https://github.com/kunaltyagi9/MERN-Stack-Projects/tree/master/ECommerce-Website
  
  5.MERN_STACK_IMAGE_UPLOAD   ---------> https://github.com/harsh17112000/mern_imgupload_youtube
   
  6.MERN_STACK_BLOG_WEBISTE -------> https://github.com/kunaltyagi9/MERN-Stack-Projects/tree/master/Blog-Website

*/
