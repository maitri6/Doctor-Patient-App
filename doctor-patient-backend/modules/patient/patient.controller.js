const DoctorModel = require("../doctor/doctor.model");
const moment = require('moment');
const cron = require('node-cron');
const schedule = require('node-schedule');
const { sendResponse } = require("../../helpers/requestHandler.helper");
const AppointmentModel = require("../patient/bookAppointment.model");
const { VISTING_SLOTS } = require('../../config/constant');
const { COMMON_SYMPTOMS } = require('../../config/constant');


exports.getAllApprovedDoctors = async (req, res, next) => {
  try {
    let getDoctors = await DoctorModel.find({ isApproved: true, role: "doctor", specialization: req.params.disease })
      .lean()
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "profileImage",
      })
      .select([
        "name",
        "specialization",
        "experience",
        "degree",
        "clinicName",
        "clinicAddress",
        "clinicFees"
      ]);
    return sendResponse(
      res,
      true,
      200,
      "List of doctors", getDoctors
    );
  } catch (error) { }
};

exports.getAllDiseases = async (req, res, next) => {
  try {
    return sendResponse(
      res,
      true,
      200,
      "Disease fetched successfully",
      COMMON_SYMPTOMS
    );
  } catch (error) { }
};


exports.getAllDate = async (req, res, next) => {
  try {
    let date = [];
    const startDate = moment();
    for (let i = 0; i < 7; i++) {
      const currentDate = startDate.clone().add(i, 'day');
      const formattedDate = currentDate.format('DD-MM-YYYY');
      date.push(formattedDate);
    }
    return sendResponse(
      res,
      true,
      200,
      "Dates fetched successfully",
      date
    );
  } catch (error) { }
};


exports.getTimeSlots = async (req, res, next) => {
  try {
    let date = [];
    const startDate = moment();
    for (let i = 0; i < 7; i++) {
      const currentDate = startDate.clone().add(i, 'day');
      const formattedDate = currentDate.format('DD-MM-YYYY');
      date.push(formattedDate);
    }
    let getPatientAppointment = await AppointmentModel.find({ date: req.query.date });
    if (!getPatientAppointment.length < 0) {
      return sendResponse(
        res,
        true,
        400,
        "Slots not available for today. Please choose next date",
      );
    }
    const BOOKED_SLOTS = getPatientAppointment.map(obj => obj.time);
    const AVAILABLE_SLOTS = VISTING_SLOTS.filter(element => !BOOKED_SLOTS.includes(element));
    return sendResponse(
      res,
      true,
      200,
      "Available slots fetched successfully",
      AVAILABLE_SLOTS
    );

  } catch (error) { }
};


exports.patientForm = async (req, res, next) => {
  try {
    let existingAppointments = await AppointmentModel.find({ patientId: req.user.userId, date: req.body.date, doctorId: req.body.doctorId });
    if (existingAppointments.length > 0) {
      return sendResponse(
        res,
        false,
        400,
        "You cannot take appointment today"
      );
    }
    req.body.patientId = req.user.userId;
    // let doctorAvailable = await DoctorModel.findById({ _id: req.body.doctorId })
    // if (req.body.date == doctorAvailable.notAvailable)
    //   return sendResponse(
    //     res,
    //     false,
    //     400,
    //     "Doctor is not available today"
    //   );


    let saveForm = await AppointmentModel.create(req.body);
    return sendResponse(
      res,
      true,
      200,
      "Your appointment is booked for today",
      saveForm
    );
  } catch (error) {
    console.log(error);
  }
};


exports.getPatientAppointment = async (req, res, next) => {
  try {
    const getAppointment = await AppointmentModel.find({ isAppointment: "pending" })
      .lean()
      .sort({ createdAt: -1 })
      .populate({
        path: "doctorId",
        select: "name"
      })
      .select([
        "description",
        "date",
        "time",
        "appointmentType"
      ]);
    return sendResponse(
      res,
      true,
      200,
      "Patient appointments fetched successfully",
      getAppointment
    );
  } catch (error) { }
};





