const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,  
    },
    email: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      default: "",
      trim: true,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    otp: {
      type: String,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    bloodGroup: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    role:{
      type: String,
      default: "patient"
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
