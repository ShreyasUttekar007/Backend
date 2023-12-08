const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^\+91\d{10}$/,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
    match: /^\d{6}$/,
  },
  image: {
    type: String,  
    required: true,
  },
});

const FormModel = mongoose.model("Form", formSchema);

module.exports = FormModel;
