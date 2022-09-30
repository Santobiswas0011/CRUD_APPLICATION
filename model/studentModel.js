const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
   fName: {
      type: String,
      required: true
   },
   lName: {
      type: String,
      required: true
   },
   address: {
      type: String,
      required: true
   },
   phone: {
      type: Number,
      required: true
   },
   date: {
      type: String,
      required: true
   },
   imgPath: {
      type: String
   }
});

module.exports = mongoose.model("students", studentSchema);
