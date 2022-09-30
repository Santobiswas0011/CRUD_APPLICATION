const express=require('express');
const userRouter=express.Router();
const userContImport=require('../Controllers/userController');
const multer = require("multer");
const Auth=require('../middleware/Auth');

// img storage path
const imgconfig = multer.diskStorage({
   destination:(req,file,callback)=>{
       callback(null,"./uploads")
   },
   filename:(req,file,callback)=>{
       callback(null,`imgae-${Date.now()}. ${file.originalname}`)
   }
})


// img filter
const isImage = (req,file,callback)=>{
   if(file.mimetype.startsWith("image")){
       callback(null,true)
   }else{
       callback(new Error("only images is allowd"))
   }
}

const upload = multer({
   storage:imgconfig,
   fileFilter:isImage
});

userRouter.post('/studentDetails',upload.single('photo'),userContImport.studentDetailsCont);

userRouter.get('/get_st_data',Auth,userContImport.get_st_dataCont);

userRouter.get('/editData/:id',userContImport.edit_dataCont);

userRouter.post('/editDAta/:id',userContImport.editDAtaCont);

userRouter.delete('/delete/:id',userContImport.deleteController);


// for register
userRouter.post('/register',userContImport.registerCont);
userRouter.post('/login',userContImport.loginCont);

userRouter.post('/forgetPass',userContImport.forgetPassCont);

userRouter.post('/setPassword/:userId',userContImport.setPasswordCont);

module.exports=userRouter;
