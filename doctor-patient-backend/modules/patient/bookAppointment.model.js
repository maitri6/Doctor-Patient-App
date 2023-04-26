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
        type: String,   
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
    disease: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

const appointment = mongoose.model("appointment", userSchema);
module.exports = appointment;