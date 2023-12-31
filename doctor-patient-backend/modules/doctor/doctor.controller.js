const DoctorModel = require("../doctor/doctor.model");
const UserModel = require("../userAuth/user.model");
const AppointmentModel = require("../patient/bookAppointment.model");
const { IDENTITY_PROOF, BOOKED_SLOTS } = require("../../config/constant");
const { TITLES } = require("../../config/constant");
const { DEGREE } = require("../../config/constant");
const { SPECIALITY } = require("../../config/constant");
const { BLOOD_GROUP } = require("../../config/constant");
const { COLLEGES } = require("../../config/constant");
let { City } = require("country-state-city");
const bcrypt = require("bcrypt");
const { sendResponse } = require("../../helpers/requestHandler.helper");

exports.doctorForm = async (req, res, next) => {
  try {
    const checkEmail = await UserModel.findOne({
      email: req.body.email,
    }).lean();
    if (checkEmail)
      return sendResponse(
        res,
        true,
        400,
        "You have already registered with this email.."
      );
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
      "Doctor form submitted successfully",
      saveDoctor
    );
  } catch (error) { }
};

exports.getCityAndYear = async (req, res, next) => {
  try {
    if (req.query.type == "city") {
      let city = await City.getCitiesOfCountry("IN");
      return sendResponse(res, true, 200, "Cities fetched successfully", city);
    } else if (req.query.type == "year") {
      let year = Array.from(Array(new Date().getFullYear() - 1949), (_, i) =>
        (i + 1950).toString()
      );

      return sendResponse(res, true, 200, "Years fetched successfully", year);
    } else {
      return sendResponse(res, false, 400, "Please enter the valid type");
    }
  } catch (error) { }
};

exports.getDoctorAndPatientDetails = async (req, res, next) => {
  try {
    if (req.query.type == "identityProof") {
      return sendResponse(
        res,
        true,
        200,
        "Identity Proofs fetched successfully",
        IDENTITY_PROOF
      );
    } else if (req.query.type == "degree") {
      return sendResponse(
        res,
        true,
        200,
        "Degree fetched successfully",
        DEGREE
      );
    } else if (req.query.type == "speciality") {
      return sendResponse(
        res,
        true,
        200,
        "Speciality fetched successfully",
        SPECIALITY
      );
    } else if (req.query.type == "title") {
      return sendResponse(
        res,
        true,
        200,
        "Titles fetched successfully",
        TITLES
      );
    } else if (req.query.type == "bloodGroup") {
      return sendResponse(
        res,
        true,
        200,
        "Blood group fetched successfully",
        BLOOD_GROUP
      );
    } else if (req.query.type == "colleges") {
      return sendResponse(
        res,
        true,
        200,
        "Colleges fetched successfully",
        COLLEGES
      );
    }
  } catch (error) { }
};

exports.getAllAppointments = async (req, res, next) => {
  try {
    let getAllAppointments = await AppointmentModel.find({
      doctorId: req.user.userId,
    })
      .lean()
      .sort({ createdAt: -1 })
      .populate({
        path: "patientId",
        select: "name height weight bloodGroup",
      })
      .select([
        "date",
        "time",
        "description",
        "appointmentType",
        "isAppointment",
      ]);
    if (!getAllAppointments.length > 0)
      return sendResponse(res, false, 400, "No appointments found");
    return sendResponse(
      res,
      true,
      200,
      "Appointments fetched successfully",
      getAllAppointments
    );
  } catch (error) { }
};

exports.updateProfile = async (req, res, next) => {
  try {
    let findDoctor = await UserModel.findById(req.user.userId);
    // if (!findDoctor) {
    //   return sendResponse(
    //     res,
    //     false,
    //     400,
    //     "Doctor not found "
    //   );
    // }
    // let doctor = await DoctorModel.find({userId: })
    //  console.log(doctor)
    //await DoctorModel.updateOne({ userId: findDoctor._id }, { $set: { ...req.body} });
    //console.log(findDoctor.degree)

    return sendResponse(res, true, 200, "Doctor profile updated successfully");
  } catch (error) {
    console.log(error);
  }
};

exports.updatePatientStatus = async (req, res, next) => {
  try {
    let getPatient = await AppointmentModel.findOne({ patientId: req.query.patientId, doctorId: req.user.userId });
    if (!getPatient)
      return sendResponse(res, false, 400, "Appointment not found");
    getPatient.isAppointment = 'completed'; 
    getPatient.save(function (err) {
      if (err) throw err;
      console.log("Appointment status updated");
      return sendResponse(
        res,
        true,
        200,
        "Patient status updated successfully",
        getPatient
      );
    });
   
  } catch (error) {
    console.log(error);
  }
};
