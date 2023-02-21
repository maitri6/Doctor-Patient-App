const UserModel = require("./user.model");
const { BLOOD_GROUP } = require('../../config/constant');
const bcrypt = require("bcrypt");
const { sendResponse } = require("../../helpers/requestHandler.helper");
const { generateJwt } = require("../../helpers/jwt.helper");
const sendEmail = require("../../helpers/mail.helper");

/**
 * Description: Register user into the application
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.register = async (req, res, next) => {
  try {
    let subject, message, otp;
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
  } catch (error) { }
};

/**
 * Description: Login user into the application
 * @param { email, password, role } req
 * @param {*} res
 * @param {*} next
 */
exports.login = async (req, res, next) => {
  try {
    let subject, message, otp;
    const getUser = await UserModel.findOne({ email: req.body.email });
    if (!getUser) return sendResponse(res, true, 400, "User not found.");
    if (getUser.role == "doctor" && !(getUser.isApproved)) {
      return sendResponse(res, true, 400, "Please wait for admin's approval.");
    }
    if (!(await bcrypt.compare(req.body.password, getUser.password)))
      return sendResponse(res, true, 400, "Invalid password.");

    let token = await generateJwt({
      userId: getUser._id,
      email: getUser.email,
      role: getUser.role,
      phoneNumber: getUser.phoneNumber
    });
    if (token === undefined) {
      return sendResponse(
        res,
        false,
        400,
        "Something went wrong please try again."
      );
    }
    otp = await generateOTP()
    subject = "Here is your 6 digit OTP ";
    message = otp;
    await UserModel.updateOne({ _id: getUser._id }, { $set: { otp: otp } });
    sendEmail(getUser.email, subject, message);
    return sendResponse(res, true, 200, "OTP sent successfully.", {
      getUser,
      token,
    });

  } catch (error) { }
};

exports.forgetPassword = async (req, res, next) => {
  try {
    let url = "http://localhost:4200/reset-password/";
    const getUser = await UserModel.findOne({ email: req.body.email });
    if (!getUser) {
      return sendResponse(
        res,
        true,
        404,
        "User not exists or Please enter valid email."
      );
    }
    var forgetPasswordToken = await generateJwt({
      userId: getUser._id,
      email: getUser.email,
      role: getUser.role,
      phoneNumber: getUser.phoneNumber
    });

    let subject = "Forget Password";
    let send = url.concat(forgetPasswordToken);
    let html = "Hi, click the link to reset you password ".concat(send);
    sendEmail(getUser.email, subject, html);
    await UserModel.updateOne({ email: getUser.email }, { $set: { token: forgetPasswordToken, } });
    return sendResponse(res, true, 200, "Email sent successfully.");
  } catch (error) { }
};

exports.resetPassword = async (req, res) => {
  try {
    let inputToken = req.body.token;
    let newPassword = await bcrypt.hash(req.body.password, 10);
    const getUser = await UserModel.findOne({ token: inputToken });
    if (!getUser) return sendResponse(res, true, 400, "Invalid token.");

    let subject = "Reset Password";
    let html = "Password updated successfully......!";
    sendEmail(getUser.email, subject, html);
    await UserModel.updateOne({ email: getUser.email }, { $set: { password: newPassword, token: "" } });
    return sendResponse(res, true, 200, "Password updated successfully");
  } catch (error) { }
};

exports.sendOtp = async (req, res) => {
  try {
    let subject, message;
    let getUser = await UserModel.findById(req.body.userId);
    if (!getUser) return sendResponse(res, true, 400, "User not found.");
    if (req.body.type === 'resendOtp') {
      subject = "Here is your 6 digit OTP";
      otp = await generateOTP()
      message = otp;
      sendEmail(getUser.email, subject, message);
      await UserModel.updateOne({ i_id: getUser._id }, { $set: { otp: otp } });
      return sendResponse(res, true, 200, "OTP sent successfully");
    }
    const checkOtp = await UserModel.findOne({
      _id: req.body.userId,
      otp: req.body.otp
    })
    if (!checkOtp)
      return sendResponse(res, true, 400, "Invalid OTP");
    await UserModel.updateOne({ _id: checkOtp._id }, { $set: { status: true } });
    return sendResponse(res, true, 200, "User verified successfully");
  } catch (error) {}
};

function generateOTP() {
  let digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}


exports.getUserById = async (req, res, next) => {
  try {
    console.log(req.user.userId)
    let getUser = await UserModel.findById(req.user.userId);
    if (!getUser) {
      return sendResponse(
        res,
        false,
        400,
        "User not found "
      );

    }
    return sendResponse(
      res,
      true,
      200,
      "User fetched successfully ", getUser
    );
  } catch (error) { }
};


exports.changePassword = async (req, res, next) => {
  try {

    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let getUser = await UserModel.findById(req.user.userId);

    if (!getUser) {
      return sendResponse(
        res,
        false,
        400,
        "User not found "
      );
    }
    if (!(await bcrypt.compare(oldPassword, getUser.password))) {
      return sendResponse(
        res,
        false,
        400,
        "Invalid current password"
      );
    }
    if (oldPassword == newPassword) {
      return sendResponse(
        res,
        false,
        400,
        "Your new password must be different from old password."
      );
    }
    newPassword = await bcrypt.hash(req.body.newPassword, 10);
    console.log(newPassword);

    await UserModel.updateOne({ _id: getUser._id }, { $set: { password: newPassword } });

    let subject = "Password Changed";
    let html = "Hi,Your password has been changed successfully";
    sendEmail(getUser.email, subject, html);

    return sendResponse(res, true, 200, "Password changed successfully.");

  } catch (error) { }
};



exports.updateProfile = async (req, res, next) => {
  try {

    let getUser = await UserModel.findById(req.user.userId);
    if (!getUser) {
      return sendResponse(
        res,
        false,
        400,
        "User not found "
      );
    }
    await UserModel.updateOne({ _id: getUser._id }, { $set: { ...req.body } });

    return sendResponse(
      res,
      true,
      200,
      "User profile updated successfully"
    );
  } catch (error) { }
};


exports.getAllApprovedDoctors = async (req, res, next) => {
  try {
      let getDoctors = await UserModel.find({ isApproved: true,role:"doctor"})
          .lean()
          .populate({
            path: "_id",
          })
          return sendResponse(
            res,
            true,
            200,
            "List of doctors",getDoctors
          ); 
  } catch (error) {}
};