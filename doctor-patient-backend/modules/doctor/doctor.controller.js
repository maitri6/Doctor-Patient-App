const DoctorModel = require("../doctor/doctor.model");
const UserModel = require("../userAuth/user.model");
const AppointmentModel = require("../patient/bookAppointment.model");
const { IDENTITY_PROOF, BOOKED_SLOTS } = require('../../config/constant');
const { TITLES } = require('../../config/constant');
const { DEGREE } = require('../../config/constant');
const { SPECIALITY } = require('../../config/constant');
const { BLOOD_GROUP } = require('../../config/constant');
const { COLLEGES } = require('../../config/constant');
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
      "Form submitted successfully",
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
    }
    else if (req.query.type == "speciality") {
      return sendResponse(
        res,
        true,
        200,
        "Speciality fetched successfully",
        SPECIALITY
      );
    }
    else if (req.query.type == "title") {
      return sendResponse(
        res,
        true,
        200,
        "Titles fetched successfully",
        TITLES
      );
    }
    else if (req.query.type == "bloodGroup") {
      return sendResponse(
        res,
        true,
        200,
        "Blood group fetched successfully",
        BLOOD_GROUP
      );
    }
    else if (req.query.type == "colleges") {
      return sendResponse(
        res,
        true,
        200,
        "Colleges fetched successfully",
        COLLEGES
      );
    }
  } catch (error) {
    console.log(error);
  }
};


exports.getAllAppointments = async (req, res, next) => {
  try {
    let findDoctor = await AppointmentModel.find({ doctorId: req.query.doctorId, isAppointment: "pending" })
      .lean()
      .populate({
        path:'patientId',
        select: 'name height weight bloodGroup'})
      .select(["date", "time", "description","appointmentType"]);
      console.log(findDoctor)
    return sendResponse(
      res,
      true,
      200,
      "Form submitted successfully",
      findDoctor
    );
  } catch (error) {  }
};



exports.updateProfile = async (req, res, next) => {
  try {
    let findDoctor = await UserModel.findById(req.user.userId);
    console.log(findDoctor._id)
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

    return sendResponse(
      res,
      true,
      200,
      "Doctor profile updated successfully"
    );
  } catch (error) {
    console.log(error);
  }
};



exports.updatePatientStatus = async (req, res, next) => {
  try {
    let getAppointments = await AppointmentModel.findById({ _id: req.query._id });
    console.log(getAppointments)
    //console.log()
    if (!getAppointments) {
      return sendResponse(
        res,
        false,
        400,
        "Appointment not found"
      );
    }
    console.log(getAppointments.time)

    const appointmentTime = moment(getAppointments.time,'HH:mm');
     console.log(appointmentTime)
     const scheduledTime = appointmentTime.clone().add(30, 'minutes');
     console.log(scheduledTime)
      if (appointmentTime < scheduledTime && getAppointments.isAppointment !== 'Completed') {
        await AppointmentModel.updateOne({ _id: getAppointments._id }, { $set: { isAppointment: "completed" } });
        //getAppointments.isAppointment = 'Completed';
        //getAppointments.save();
        console.log("status updated !!")
      }
      else{
        console.log("not done");
      }


  } catch (error) {
    console.log(error);
   }
};













