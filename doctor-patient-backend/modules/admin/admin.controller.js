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
      sendEmail(getUser.email, subject, html);

      return sendResponse(res, true, 200, "Email sent successfully.");
    }
    return sendResponse(
      res,
      false,
      200,
      "Status got updated successfully."
    );

  } catch (error) { }
};
  
exports.getAllDetails = async (req, res, next) => {
  try {
    if(req.query.type == "admin"){
      let getAllDetails = await UserModel.find({ role: "admin" })
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
      "User fetched successfully ", getAllDetails
    );
    }
    else if(req.query.type == "doctor"){
      let getAllDetails = await DoctorModel.find({ role: "doctor" })
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
      "User fetched successfully ", getAllDetails
    );
    }
    else if(req.query.type == "patient"){
      let getAllDetails = await UserModel.find({ role: "patient" })
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
      "User fetched successfully ", getAllDetails
    );
    }
    } catch (error) { }
  };


exports.addAdmin = async (req, res, next) => {
  try {
    let subject, message, otp;
    const checkUser = await UserModel.findOne({ email: req.body.email });
    if (checkUser)
      return sendResponse(res, true, 400, "Email already exists..");
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "admin";
    let saveUser = await UserModel.create(req.body);
    sendEmail(saveUser.email, subject, message);
    return sendResponse(res, true, 200, "Admin added successfully.", saveUser);
  } catch (error) {}
};





