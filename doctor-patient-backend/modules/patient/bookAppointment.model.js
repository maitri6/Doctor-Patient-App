const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    description: {
        type: String,
    },
    date: {
        type: Date,   
    },
    time: {
        type: String,
    },
    isAppointment: {
        type: String,
        default: "pending",
    },
    appointmentType: {
      type: String
    },
    fees: {
      type: Number
    },
  },
  {
    timestamps: true,
  }
);

const appointment = mongoose.model("appointment", userSchema);
module.exports = appointment;