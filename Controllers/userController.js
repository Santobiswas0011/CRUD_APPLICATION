
const StudentModel = require('../model/studentModel');
const UserModel = require('../model/userModel');
const moment = require("moment");
const bcrypt = require("bcryptjs");

const nodemailer = require('nodemailer');
const { assign } = require('nodemailer/lib/shared');

const transporter = nodemailer.createTransport({
     host: 'smtp',
     port: 3002,
     secure: false,
     requireTLS: true,
     service: 'gmail',
     auth: {
          user: 'biswassanto0011@gmail.com',
          pass: 'muvavoatjqkovrbe'
     }
});


exports.studentDetailsCont = async (req, res) => {
     const { filename } = req.file;
     const { fName, lName, address, phone } = req.body;

     try {
          const date = moment(new Date()).format('YYYY-MM-DD');
          const student_data = new StudentModel({
               fName: fName,
               lName: lName,
               address: address,
               phone: phone,
               date: date,
               imgPath: filename
          });

          const allStudents = await student_data.save();
          res.status(201).json(allStudents);

     } catch (error) {
          return res.status(401).json(error.message)
     }
}


exports.get_st_dataCont = async (req, res) => {
     try {
          const data = await StudentModel.find({});
          return res.status(201).json(data);
     } catch (error) {
          return res.status(401).json(error.message);
     }
}

exports.edit_dataCont = async (req, res) => {
     try {
          const { id } = req.params;
          const data = await StudentModel.findOne({ _id: id });
          return res.status(201).json(data)
     } catch (error) {
          return res.status(401).json(error.message);
     }
}

exports.editDAtaCont = async (req, res) => {
     const student = req.body;
     const { id } = req.params;

     try {
          // const date = moment(new Date()).format('YYYY-MM-DD');
          await StudentModel.updateOne({ _id: id }, student);
          res.status(201).json(student)
     } catch (error) {
          return res.status(401).json(error.message);
     }
}

exports.deleteController = async (req, res) => {
     const { id } = req.params;
     try {
          await StudentModel.deleteOne({ _id: id });
          return res.status(201).json({ message: "Successfully delete" })
     } catch (error) {
          return res.status(401).json(error.message);
     }
}



// for register

exports.registerCont = async (req, res) => {
     const { uName, email, password } = req.body;

     UserModel.findOne({ email: email }).then((data) => {
          if (data) {
               return res.status(401).json({ message: "Email already exist" })
          } else {
               bcrypt.hash(password, 10).then((hashPassword) => {
                    const user_data = new UserModel({
                         uName: uName,
                         email: email,
                         password: hashPassword
                    });
                    user_data.save().then(() => {
                         let mailOptions = {
                              from: 'biswassanto0011@gmail.com',
                              to: email,
                              subject: 'Sending Email using Node.js to confirm registration',
                              text: 'You have successfully registered'
                         };
                         transporter.sendMail(mailOptions, (error, info) => {
                              if (error) {
                                   console.log("Error to send mail", error);
                              } else {
                                   console.log("Email sent" + info.response);
                              }
                         });
                         return res.status(201).json({ message: "Registration successfully" });
                    }).catch((err) => {
                         return res.status(401).json(err.message);
                    })
               }).catch((err) => {
                    return res.status(401).json(err.message);
               })
          }
     }).catch((err) => {
          return res.status(401).json(err.message);
     });

}


// for login

exports.loginCont = async (req, res) => {
     const { email, password } = req.body;
     try {
          const userLogin = await UserModel.findOne({ email: email });
          if (!userLogin) {
               return res.status(401).json({ message: "Invalid email" });
          } else {
               const isMatch = await bcrypt.compare(password, userLogin.password);
               if (!isMatch) {
                    return res.status(400).json({ message: "Wrong password" })
               } else {
                    const token = await userLogin.generatAuthToken();
                    // console.log(token);
                    return res.status(201).json({ token: token, userLogin });
               }
          }
     } catch (error) {
          res.status(407).json(error.message)
     }
}


// forgetPassCont
exports.forgetPassCont = async (req, res) => {
     try {
          const { email } = req.body;
          const userValue = await UserModel.findOne({ email: email });
          if (!userValue) {
               return res.status(401).json({ message: "Invalid email" });
          } else {
               const userId = userValue._id;
               const url = 'http://localhost:3000/setNewPassword/' + userId;
               const textForget = "Click here --->";

               let mailOptions = {
                    from: 'biswassanto0011@gmail.com',
                    to: email,
                    subject: "Forget password",
                    text: "Set new password",
                    html: textForget.concat(url)
               }
               transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                         console.log("Error to send mail", error);
                    } else {
                         console.log("Email sent" + info.response);

                         return res.status(201).json({ message: "Check your inbox" })
                    }
               });

          }
     } catch (error) {
          res.status(407).json(error.message)
     }
}


// setPasswordCont

exports.setPasswordCont = (req, res) => {
     const { n_password, c_password } = req.body;
     const { userId } = req.params;

     if (n_password === c_password) {
          UserModel.findById(userId).then((user) => {
               const uName = user.uName;
               const email = user.email;

               bcrypt.hash(n_password, 10).then((hashPassword) => {
                    user.uName = uName,
                    user.email = email,
                    user.password = hashPassword

                    user.save().then(() => {
                         return res.status(201).json({ message: "Password change" })
                    }).catch((err) => {
                         console.log(err)
                    })
               }).catch((err) => {
                    console.log(err)
               });
          }).catch((err) => {
               console.log(err);
          })
     } else {
          return res.status(401).json({ message: "Password dose't match" });
     }
}
