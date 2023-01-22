const DoctorModel = require("../doctor/doctor.model");
const UserModel = require("../userAuth/user.model");
const { sendResponse } = require("../../helpers/requestHandler.helper");

exports.doctorForm = async (req, res, next) => {
    try{
      const checkEmail=await UserModel.findOne({email:req.body.email}).lean();
      if(checkEmail)
         return sendResponse(res, true, 400, "You have already registered with this email..");
      let saveUser = await UserModel.create(req.body);
      let saveDoctor = await DoctorModel.create({...req.body,userId:saveUser._id});
      return sendResponse(
        res,
        true,
        200,
        "Form submitted successfully",
        saveDoctor
      );
    }
    catch (error) {
      console.log("error",error);
    }
  
  };