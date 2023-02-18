const Joi = require("joi");
const { sendResponse } = require("../helpers/requestHandler.helper");
const { uniqueEmail } = require("./rules");
const { uniquePhone } = require("./rules");
const { IDENTITY_PROOF } = require('../config/constant');

const doctorValidation = async (req, res, next) => {
  try {

    const schema = Joi.object({
      title: Joi.string().required(),
      name: Joi.string().required().messages( {"string.empty": "Name field cannot be empty."}).pattern(/^[a-zA-Z\\s]*$/),

      phoneNumber: Joi.string().required().pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).messages({
        "string.pattern.base": "Invalid phone number."
      }),
      specialization: Joi.string().required(),
      gender: Joi.string().required(),
      identityProof: Joi.string().required(),
      identityProofValue: Joi.required(),
      registrationNumber: Joi.number().required(),
      registrationCouncil: Joi.string().required(),
      registrationYear: Joi.number().required(),
      degree: Joi.string().required(),
      city: Joi.string().required(),
      college: Joi.string().required(),
      year: Joi.number().required(),
      experience: Joi.number().required(),

    }).options({ allowUnknown: true });


    const { value, error } = schema.validate(req.body);


    if (error !== undefined) {
      return sendResponse(res, false, 422, error.details[0].message);
    }

    //function call
    let result = await validate(req.body);
    if (!result) {
      return sendResponse(res, false, 422, "Please enter validate identity proof number");
    }

    // set the variable in the request for validated data
    req.validated = value;
    next();
  } catch (error) {
    next(error);
  }
};

// function to validate identity proof values

function validate(data) {
  var regex1 = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
  var regex2 = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
  var regex3 = /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/;
  var regex4 = /^[A-Z]{3}[0-9]{7}$/;
  var regex5 = /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/;
  if (data.identityProof == "aadharCard") {
    if (regex1.test(data.identityProofValue) == true) {

      console.log("aadhar");
      return true;
    }
    else {
      console.log("false");
      return false;
    }
  }
  else if (data.identityProof == "panCard") {
    if (regex2.test(data.identityProofValue) == true) {

      console.log("pan");
      return true;
    }
    else {
      console.log("false");
      return false;
    }
  }
  else if (data.identityProof == "passport") {
    if (regex3.test(data.identityProofValue) == true) {

      console.log("password");
      return true;
    }
    else {
      console.log("false");
      return false;
    }
  }
  else if (data.identityProof == "voterCard") {
    if (regex4.test(data.identityProofValue) == true) {

      console.log("voter");
      return true;
    }
    else {
      console.log("false");
      return false;
    }
  }
  else if (data.identityProof == "drivingLicense") {
    if (regex5.test(data.identityProofValue) == true) {

      console.log("driving");
      return true;
    }
    else {
      console.log("false");
      return false;
    }
  }
}

module.exports = {
  doctorValidation
}