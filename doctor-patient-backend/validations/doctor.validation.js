const Joi = require("joi");
const { sendResponse } = require("../helpers/requestHandler.helper");
const { uniqueEmail } = require("./rules");
const { uniquePhone } = require("./rules");

const DoctorModel = require("../modules/doctor/doctor.model");


const doctorValidation = async (req, res, next) => {
    try {
      const schema = Joi.object({
        title:Joi.string().required(),
        name:Joi.string().required(),
        //email: Joi.string().email().required().messages( {"string.empty": "Please add an email.","string.email": "Please add an valid email."}),
        //password: Joi.string().required(),
        // phoneNumber :Joi.string().required()
        // .pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).messages({
        //     "string.pattern.base": "Invalid phone number."

        //   }),
        specialization: Joi.string().required(), 
        gender: Joi.string().required(), 
        identityProof: Joi.string().required(), 
        //identityProofValue: Joi.required(),
        registrationNumber: Joi.number().required(), 
        registrationCouncil: Joi.string().required(), 
        registrationYear: Joi.number().required(), 
        degree: Joi.string().required(), 
       // city: Joi.string().required(), 
        college: Joi.string().required(), 
        year: Joi.number().required(),
        experience: Joi.number().required(),

       
    
      }).options({ allowUnknown: true });
      if (req.body.identityProof=="aadharCard"){
        req.body.identityProofValue=Joi.number().max(12).required();
      }
  
      const { value, error } = schema.validate(req.body);

      
      if (error !== undefined) {
        return sendResponse(res, false, 422, error.details[0].message);
      }
  
      // set the variable in the request for validated data
      req.validated = value;
      next();
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    doctorValidation
}