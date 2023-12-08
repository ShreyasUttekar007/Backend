const express = require("express");
const multer = require("multer");
const fs = require("fs").promises;
const path = require("path");
const FormModel = require("../models/FormModel");

const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.post("/submit", upload.single("image"), async (req, res) => {
  try {
    const formData = req.body;

    const university = formData.university === 'new' ? formData.newUniversity : formData.university;

    const formEntry = new FormModel({
      code: formData.code,
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      dob: formData.dob,
      gender: formData.gender,
      district: formData.district,
      university: university, 
      pincode: formData.pincode,
      image: req.file.buffer.toString("base64"), 
    });

    await formEntry.save();

    res
      .status(201)
      .json({ message: "Form submitted successfully", code: formEntry.code });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allFormData = await FormModel.find({}, { code: 1, name: 1, phoneNumber: 1, dob: 1, gender: 1, district: 1, university: 1, pincode: 1, _id: 0, image: 1 });
    res.status(200).json(allFormData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
