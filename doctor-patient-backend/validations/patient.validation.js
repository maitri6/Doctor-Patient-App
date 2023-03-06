const Joi = require("joi");
const { sendResponse } = require("../helpers/requestHandler.helper");


const patientFormValidation = async (req, res, next) => {
    try {
      const schema = Joi.object({
        doctorId:Joi.string()
        .required()
        .max(24)
        .messages( {"string.empty": "Doctor Id field cannot be empty."}),
        description:Joi.required().string(),
        date:Joi.required().string(),
        time:Joi.required().string(),
        appointmentType:Joi.required().string()
    
      }).options({ allowUnknown: true });
  
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
    patientFormValidation
 
}