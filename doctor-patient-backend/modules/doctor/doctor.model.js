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
    identityProof: {
      type: String,
    },
    identityProofValue: {
      type: String,
    },
    registrationNumber: {
      type: String,
    },
    registrationCouncil: {
      type: String,
    },
    registrationYear: {
      type: String,
    },
    degree: {
      type: String,
    },
    college: {
      type: String,
    },
    year: {
      type: String,
    },
    experience: {
      type: String,
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
