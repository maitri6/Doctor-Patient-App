const DoctorModel = require("../doctor/doctor.model");
const { sendResponse } = require("../../helpers/requestHandler.helper");
const UserModel = require("../userAuth/user.model");
const AppointmentModel = require("../patient/bookAppointment.model");
const moment = require('moment');

exports.getAllApprovedDoctors = async (req, res, next) => {
  try {
      let getDoctors = await DoctorModel.find({ isApproved: true, role: "doctor", specialization: req.query.disease })
        .lean()
        .populate({
          path: "_id",
        })
        .select(["name", "specialization", "experience", "degree", "clinicName", "clinicAddress"]);
      return sendResponse(
        res,
        true,
        200,
        "List of doctors", getDoctors
      );
    }
  catch (error) {
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
  } catch (error) { }
};



exports.patientForm = async (req, res, next) => {
  try {
    let checkUser = await UserModel.findById(req.user.userId);
    if (!checkUser) return sendResponse(res, true, 400, "User not found.");
    let saveForm = await AppointmentModel.create(req.body);
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



exports.getAllDateAndTime = async (req, res, next) => {
  try {
    if (req.query.type == "date") {
      const today = new Date(); // Get current date
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let dates = [];

      // Loop through next 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i); // Set the date to i days in the future
        const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : days[date.getDay()]; // Get the day name
        const monthName = date.toLocaleString('default', { month: 'long' }); // Get the month name
        dates.push(`${dayName}, ${monthName} ${date.getDate()}`);
      }
      return sendResponse(
        res,
        true,
        200,
        "Dates fetched successfully",
        dates
      );
    }
    else if (req.query.type == "time") {
      const currentDate = new Date();
      const startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0, 0);
      const endTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0, 0);
      const slotDuration = 30; // in minutes
      const totalMinutes = (endTime.getTime() - startTime.getTime()) / 1000 / 60; // convert from milliseconds to minutes
      const timeSlots = [];

      for (let i = 0; i < 20; i++) {
        const randomMinutes = Math.floor(Math.random() * (totalMinutes - slotDuration)) + 1; // add 1 to avoid generating start times that are too close to the end time
        const startTimeForSlot = new Date(startTime.getTime() + (randomMinutes * 60 * 1000));
        timeSlots.push(startTimeForSlot.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })); // push the formatted start time string to the array
        //timeSlots.push(startTimeForSlot);
      }
      timeSlots.sort((a, b) => a - b);
      return sendResponse(
        res,
        true,
        200,
        "Time slots fetched successfully",
        timeSlots
      );
    }
  } catch (error) { }
};



