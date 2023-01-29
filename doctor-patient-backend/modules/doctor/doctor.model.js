const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,  
    },
    name: {
      type: String,
      trim: true,
    },
    specialization: {
      type: String,
    },
    gender: {
      type: String,
    },
    identityProof: {
      type: String,
    },
    identityProofValue: {
      type: String,
    },
    registrationNumber: {
      type: Number,
    },
    registrationCouncil: {
      type: String,
    },
    registrationYear: {
      type: Number,
    },
    degree: {
      type: String,
    },
    city: {
      type: String,
    },
    college: {
      type: String,
    },
    year: {
      type: Number,
    },
    experience: {
      type: Number,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    
  },
  {
    timestamps: true,
  }
);

const doctor = mongoose.model("doctor", userSchema);
module.exports = doctor;
