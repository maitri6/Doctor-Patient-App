const DoctorModel = require("../doctor/doctor.model");
const UserModel = require("../userAuth/user.model");
const moment = require("moment");
const cron = require("node-cron");
const schedule = require("node-schedule");
const { sendResponse } = require("../../helpers/requestHandler.helper");
const AppointmentModel = require("../patient/bookAppointment.model");
const { VISTING_SLOTS } = require("../../config/constant");
const { COMMON_SYMPTOMS } = require("../../config/constant");

exports.getAllApprovedDoctors = async (req, res, next) => {
  try {
    let getDoctors = await DoctorModel.find({
      isApproved: true,
      role: "doctor",
      specialization: req.params.disease,
    })
      .lean()
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: ["profileImage", "name"],
      })
      .select([
        "specialization",
        "experience",
        "degree",
        "clinicName",
        "clinicAddress",
        "clinicFees",
      ]);
    return sendResponse(
      res,
      true,
      200,
      "Doctors fetched successfully",
      getDoctors
    );
  } catch (error) {}
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
  } catch (error) {}
};

exports.getAllDate = async (req, res, next) => {
  try {
    let date = [];
    const startDate = moment();
    for (let i = 0; i < 7; i++) {
      const currentDate = startDate.clone().add(i, "day");
      const formattedDate = currentDate.format("DD-MM-YYYY");
      date.push(formattedDate);
    }
    return sendResponse(res, true, 200, "Dates fetched successfully", date);
  } catch (error) {}
};

exports.getTimeSlots = async (req, res, next) => {
  try {
    let date = [];
    const startDate = moment();
    for (let i = 0; i < 7; i++) {
      const currentDate = startDate.clone().add(i, "day");
      const formattedDate = currentDate.format("DD-MM-YYYY");
      date.push(formattedDate);
    }
    let getPatientAppointment = await AppointmentModel.find({
      date: req.query.date,
    });
    if (!getPatientAppointment.length < 0) {
      return sendResponse(
        res,
        true,
        400,
        "Slots not available for today. Please choose next date"
      );
    }
    const BOOKED_SLOTS = getPatientAppointment.map((obj) => obj.time);
    const AVAILABLE_SLOTS = VISTING_SLOTS.filter(
      (element) => !BOOKED_SLOTS.includes(element)
    );
    return sendResponse(
      res,
      true,
      200,
      "Available slots fetched successfully",
      AVAILABLE_SLOTS
    );
  } catch (error) {}
};

exports.patientForm = async (req, res, next) => {
  try {
    let existingAppointments = await AppointmentModel.find({
      patientId: req.user.userId,
      date: req.body.date,
      doctorId: req.body.doctorId,
    });
    if (existingAppointments.length > 0)
      return sendResponse(
        res,
        false,
        400,
        "Appointment already booked for today "
      );

    req.body.patientId = req.user.userId;
    await AppointmentModel.create(req.body);
    return sendResponse(res, true, 200, "Appointment booked successfully");
  } catch (error) {}
};

exports.getPatientAppointment = async (req, res, next) => {
  try {
    const getPatientAppointments = await AppointmentModel.find({
      patientId: req.user.userId,
    })
      .lean()
      .sort({ createdAt: -1 })
      .select([
        "description",
        "date",
        "time",
        "appointmentType",
        "isAppointment",
      ]);

    if (!getPatientAppointments.length > 0)
      return sendResponse(res, false, 400, "No Appointments Booked");
   // get userId in doctor table & then with userId in user table find only name 
    return sendResponse(
      res,
      true,
      200,
      "Patient appointments fetched successfully",
      getPatientAppointments
    );
  } catch (error) {}
};
