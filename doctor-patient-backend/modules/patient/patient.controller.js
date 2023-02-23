const DoctorModel = require("../doctor/doctor.model");
const { sendResponse } = require("../../helpers/requestHandler.helper");



exports.getAllApprovedDoctors = async (req, res, next) => {
  try {
    if(req.query.disease=="generalPhysician")
    {let getDoctors = await DoctorModel.find({ isApproved: true, role: "doctor",specialization:req.query.disease })
      .lean()
      .populate({
        path: "_id",
      })
      .select(["name", "specialization", "experience", "degree"]);
    return sendResponse(
      res,
      true,
      200,
      "List of doctors", getDoctors
    );}
    return sendResponse(
      res,
      false,
      400,
      "No doctors available"
    );
  } catch (error) {
    console.log(error);
  }
};



exports.getAllDieases = async (req, res, next) => {
  try {

    return sendResponse(
      res,
      true,
      200,
      "Disease fetched successfully",
      COMMON_SYMPTOMS
    );
  } catch (error) {}
};




exports.patientForm = async (req, res, next) => {
  try {
    let saveForm = await UserModel.create(req.body);
    return sendResponse(
      res,
      true,
      200,
      "Patient form saved",
      saveForm
    );
  } catch (error) {
    console.log(error);
  }
};




