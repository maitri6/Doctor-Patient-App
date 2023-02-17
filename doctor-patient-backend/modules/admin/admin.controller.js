const DoctorModel = require("../doctor/doctor.model");
const UserModel = require("../userAuth/user.model");
const { sendResponse } = require("../../helpers/requestHandler.helper");
const sendEmail = require("../../helpers/mail.helper");

exports.updateStatus = async (req, res, next) => {
  try {
    let getUser = await UserModel.findById(req.body.userId);
    if(!getUser){
      return sendResponse(
        res,
        false,
        400,
        "User not found."
      );
    }
    await UserModel.updateOne({_id:getUser._id}, {$set: {isApproved: req.body.status}}) 
    if(req.body.status==true){
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
      
  } catch (error) {
    console.log("error", error);
  }
};



