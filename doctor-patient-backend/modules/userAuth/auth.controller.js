const UserModel = require("./user.model");
const bcrypt = require("bcrypt");
const { sendResponse } = require("../../helpers/requestHandler.helper");
const { generateJwt } = require("../../helpers/jwt.helper");
const sendEmail = require("../../helpers/mail.helper");
const user = require("./user.model");
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
    const filter_1 = {
      _id: saveUser._id,
    };

    const updateOtp = {
      $set: {
        otp: otp,
      },
    };
    await UserModel.updateOne(filter_1, updateOtp);
    sendEmail(saveUser.email, subject, message);
    return sendResponse(res, true, 200, "OTP sent successfully.", saveUser);
  } catch (error) {
  }
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
    let password = req.body.password;

    const getUser = await UserModel.findOne({ email: req.body.email });
    if (!getUser) return sendResponse(res, true, 400, "User not found.");
    if(getUser.role == "doctor" && !(getUser.isApproved)){
      return sendResponse(res, true, 400, "Please wait for admin's approval.");
    }
      if (getUser && !(await bcrypt.compare(password, getUser.password)))
        return sendResponse(res, true, 400, "Invalid password.");

      let token = await generateJwt({ userId: getUser._id });
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
      const filter_1 = {
        _id: getUser._id,
      };

      const updateOtp = {
        $set: {
          otp: otp,
        },
      };
      await UserModel.updateOne(filter_1, updateOtp);
      sendEmail(getUser.email, subject, message);
      return sendResponse(res, true, 200, "OTP sent successfully.", {
        getUser,
        token,
      }); 

  } catch (error) {
  }

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
    var forgetPasswordToken = await generateJwt({ email: getUser.email });

    let subject = "Forget Password";
    let send = url.concat(forgetPasswordToken);
    let html = "Hi, click the link to reset you password ".concat(send);
    sendEmail(getUser.email, subject, html);
    const filter = {
      email: getUser.email,
    };
    const updateTokenInDB = {
      $set: {
        token: forgetPasswordToken,
      },
    };
    await UserModel.updateOne(filter, updateTokenInDB);
    return sendResponse(res, true, 200, "Email sent successfully.");
  } catch (error) {
  }
};

exports.resetPassword = async (req, res) => {
  try {
    let inputToken = req.body.token;
    let newPassword = await bcrypt.hash(req.body.password, 10);
    const getUser = await UserModel.findOne({ token: inputToken });
    if (!getUser) return sendResponse(res, true, 400, "Invalid token.");
    const filter_1 = {
      email: getUser.email,
    };

    const updateNewPassword = {
      $set: {
        password: newPassword,
        token: "",
      },
    };
    let subject = "Reset Password";
    let html = "Password updated successfully......!";
    sendEmail(getUser.email, subject, html);
    await UserModel.updateOne(filter_1, updateNewPassword);
    return sendResponse(res, true, 200, "Password update successfully");
  } catch (error) {
  }
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

      const filter_1 = {
        _id: getUser._id,
      };

      const updateOtp = {
        $set: {
          otp: otp
        },
      };
      await UserModel.updateOne(filter_1, updateOtp);
      return sendResponse(res, true, 200, "OTP sent successfully");
    }
    const checkOtp = await UserModel.findOne({
      _id: req.body.userId,
      otp: req.body.otp
    })
    if (!checkOtp)
      return sendResponse(res, true, 400, "Invalid OTP");

    const filter_1 = {
      _id: checkOtp._id,
    };

    const updateOtp = {
      $set: {
        status: true,
      },
    };

    await UserModel.updateOne(filter_1, updateOtp);
    return sendResponse(res, true, 200, "User verified successfully");
  } catch (error) {
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


exports.getUserById = async (req, res, next) => {
  try {

    let getUser = await UserModel.findById(req.user.userId);
    if (!getUser) {
      return sendResponse(
        res,
        false,
        400,
        "User Not found "
      );

    }
    return sendResponse(
      res,
      true,
      200,
      "User fetched Successfully ", getUser
    );
  } catch (error) {
    console.log("error", error);
  }
};


exports.changePassword = async (req, res, next) => {
  try {

    let oldPassword = req.body.oldPassword;
    let getUser = await UserModel.findById(req.user.userId);

    if (getUser && await bcrypt.compare(oldPassword, getUser.password)) {
      let newPassword = await bcrypt.hash(req.body.newPassword, 10);
      console.log(newPassword);
      await UserModel.updateOne({_id: getUser._id}, { $set: {password: newPassword}});
      return sendResponse(
        res,
        true,
        200,
        "Password changed successfully"
      );
    }
    else {
      return sendResponse(
        res,
        false,
        400,
        "User Not found "
      );
    }
  } catch (error) {
    console.log("error", error);
  }
};

