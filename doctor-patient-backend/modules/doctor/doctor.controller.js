const DoctorModel = require("../doctor/doctor.model");
const UserModel = require("../userAuth/user.model");
const { IDENTITY_PROOF } = require('../../config/constant');
const Joi = require("joi");

//const City = require('country-state-city').default;
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
  } catch (error) {
    console.log("error", error);
  }
};


exports.getAllIdentityProofs = async (req, res, next) => {
  try {
    return sendResponse(
      res,
      true,
      200,
      "Identity Proofs fetched successfully",
      IDENTITY_PROOF
    );
  } catch (error) {
    console.log("error", error);
  }
};