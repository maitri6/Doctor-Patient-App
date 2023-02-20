const DoctorModel = require("../doctor/doctor.model");
const UserModel = require("../userAuth/user.model");
const bcrypt = require("bcrypt");
const { sendResponse } = require("../../helpers/requestHandler.helper");
const sendEmail = require("../../helpers/mail.helper");

exports.updateStatus = async (req, res, next) => {
  try {
    let getUser = await UserModel.findById(req.body.userId);
    if (!getUser) {
      return sendResponse(
        res,
        false,
        400,
        "User not found."
      );
    }
    await UserModel.updateOne({ _id: getUser._id }, { $set: { isApproved: req.body.status } })
    if (req.body.status == true) {
      let subject = "Got approved from admin";
      let html = "Hi,You got approval from admin. Please visit login page to continue.";
      console.log(getUser.email);
      sendEmail(getUser.email, subject, html);

      return sendResponse(res, true, 200, "Email sent successfully.");
    }
    return sendResponse(
      res,
      false,
      200,
      "Status got updated successfully."
    );

  } catch (error) {
    console.log("error", error);
  }
};


exports.getAllDoctors = async (req, res, next) => {
  try {
    if (req.query.type == "doctor") {
      let getDoctors = await DoctorModel.find({ role: "doctor" })
        .lean()
        .populate({
          path: "userId",
          // select: ["email"]
        })
      //.select(["city"]);
      //.then(users => {
      return sendResponse(
        res,
        true,
        200,
        "User fetched Successfully ", getDoctors
      );
      //});
    } else if (req.query.type == "patient") {
      let getPatients = await UserModel.find({ role: "patient" })
        .lean()
        .populate({
          path: "_id",
          // select: ["email"]
        })
      //.select(["city"]);
      //.then(users => {
      return sendResponse(
        res,
        true,
        200,
        "User fetched Successfully ", getPatients
      );
    }
    else if (req.query.type == "admin") {
      let getAdmins = await UserModel.find({ role: "admin" })
        .lean()
        .populate({
          path: "_id",
          // select: ["email"]
        })
      //.select(["city"]);
      //.then(users => {
      return sendResponse(
        res,
        true,
        200,
        "User fetched Successfully ", getAdmins
      );
    }

  } catch (error) {
    console.log("error", error);
  }
};



exports.AddAll = async (req, res, next) => {
  try {
    let subject, message, otp;

    if (req.query.type == "patient") {
      const checkUser = await UserModel.findOne({ email: req.body.email });

      if (checkUser)
        return sendResponse(res, true, 400, "Email already exists..");
      req.body.password = await bcrypt.hash(req.body.password, 10);
      let saveUser = await UserModel.create(req.body);
      otp = await generateOTP()
      subject = "Here is your 6 digit OTP ";
      message = otp;
      await UserModel.updateOne({ _id: saveUser._id }, { $set: { otp: otp, } });
      sendEmail(saveUser.email, subject, message);
      return sendResponse(res, true, 200, "OTP sent successfully.", saveUser);
    }
    else if (req.query.type == "doctor") {
      let title = req.body.title;
      title = ['Dr', 'Mr', 'Ms', 'Mrs'];
      for (var i in title)
        console.log(title[i]);
      req.body.password = await bcrypt.hash(req.body.password, 10);
      req.body.isApproved = false;
      req.body.role = "doctor";
      let saveUser = await UserModel.create(req.body);


      let saveDoctor = await DoctorModel.create({
        ...req.body,
        userId: saveUser._id,
      });
      return sendResponse(
        res,
        true,
        200,
        "Form submitted successfully",
        saveDoctor
      );
    }
    else if (req.query.type == "admin") {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      req.body.role = "admin";
      let saveUser = await UserModel.create(req.body);
      otp = await generateOTP()
      subject = "Here is your 6 digit OTP ";
      message = otp;
      await UserModel.updateOne({ _id: saveUser._id }, { $set: { otp: otp, } });
      sendEmail(saveUser.email, subject, message);
      return sendResponse(res, true, 200, "OTP sent successfully.", saveUser);
    }

  } catch (error) {
    console.log("error", error);
  }
};

function generateOTP() {
  let digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}



