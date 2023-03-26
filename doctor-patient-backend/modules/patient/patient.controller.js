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
      .select(["name", "specialization", "experience", "degree", "clinicName", "clinicAddress"]);
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
  } catch (error) { 
    console.log(error);
  }
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
    let doctorSlot = await AppointmentModel.find({ date: req.query.date });
    if (doctorSlot) {
      const BOOKED_SLOTS = doctorSlot.map(obj => obj.time);
      const AVAILABLE_SLOTS = VISTING_SLOTS.filter(element => !BOOKED_SLOTS.includes(element));
      return sendResponse(
        res,
        true,
        200,
        "Available slots fetched successfully",
        AVAILABLE_SLOTS
      );
    }
    return sendResponse(
      res,
      false,
      400,
      "No slots available"
    );
  } catch (error) { }
};


exports.patientForm = async (req, res, next) => {
  try {
    let existingAppointments = await AppointmentModel.find({ patientId: req.user.userId, date: req.query.date, doctorId: req.body.doctorId });
    if (existingAppointments.length > 0) {
      return sendResponse(
        res,
        false,
        400,
        "You cannot take appointment today"
      );
    }
    console.log(req.body.date)
    req.body.patientId = req.user.userId;
    let doctorAvailable = await DoctorModel.findById({_id: req.body.doctorId})
     if(req.body.date==doctorAvailable.notAvailable)
     return sendResponse(
      res,
      false,
      400,
      "Doctor is not available today"
    );
    let saveForm = await AppointmentModel.create(req.body);
    return sendResponse(
      res,
      true,
      200,
      "You can take appointment for today",
      saveForm
    );
  } catch (error) {}   
};


