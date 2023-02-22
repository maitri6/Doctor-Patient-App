const DoctorModel = require("../doctor/doctor.model");
//const UserModel = require("../userAuth/user.model");

const { sendResponse } = require("../../helpers/requestHandler.helper");



exports.getAllApprovedDoctors = async (req, res, next) => {
    try {
        let getDoctors = await DoctorModel.find({ isApproved: true,role:"doctor"})
            .lean()
            .populate({
              path: "_id",
              //select: ["name","specialization","experience","degree"]
            })
            .select(["name","specialization","experience","degree"]);
            return sendResponse(
              res,
              true,
              200,
              "List of doctors",getDoctors
            ); 
    } catch (error) {
      console.log(error);
    }
  };