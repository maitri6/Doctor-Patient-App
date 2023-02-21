const Joi = require("joi");
const { sendResponse } = require("../helpers/requestHandler.helper");

const doctorValidation = async (req, res, next) => {
  try {

    const schema = Joi.object({
      title: Joi.string().required(),
      name: Joi.string().
      required()
      .messages( {"string.empty": "Name field cannot be empty."})
      .pattern(/^[a-zA-Z\\s]*$/),

      phoneNumber: Joi.string()
      .required()
      .pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
      .messages({
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
  var aadharCardRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
  var panCardRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
  var passportRegex = /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/;
  var voterCardRegex = /^[A-Z]{3}[0-9]{7}$/;
  var drivingLicenseRegex = /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/;
  if (data.identityProof == "aadharCard")
    if (aadharCardRegex.test(data.identityProofValue) == true) 
      return true;
  else if (data.identityProof == "panCard") 
    if (panCardRegex.test(data.identityProofValue) == true) 
      return true;
  else if (data.identityProof == "passport") 
    if (passportRegex.test(data.identityProofValue) == true) 
      return true;
  else if (data.identityProof == "voterCard") 
    if (voterCardRegex.test(data.identityProofValue) == true) 
      return true;
  else if (data.identityProof == "drivingLicense") 
    if (drivingLicenseRegex.test(data.identityProofValue) == true) 
      return true; 
}

// function validateSpeciality(data){
//   if(data.degree=="md")
//     return data.specialization.
// }


module.exports = {
  doctorValidation
}
