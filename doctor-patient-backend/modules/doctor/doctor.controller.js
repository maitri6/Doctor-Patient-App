const DoctorModel = require("../doctor/doctor.model");
const UserModel = require("../userAuth/user.model");
const { sendResponse } = require("../../helpers/requestHandler.helper");



exports.doctorForm = async (req, res, next) => {
    try{
      let saveUser = await UserModel.create(req.body);
      let saveDoctor = await DoctorModel.create({...req.body,userId:saveUser._id});
      return sendResponse(
        res,
        true,
        200,
        saveDoctor
      );
    }
    catch (error) {
      console.log("error",error);
    }
  
  
  };