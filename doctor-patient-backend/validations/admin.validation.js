const Joi = require("joi");
const { sendResponse } = require("../helpers/requestHandler.helper");


const UserModel = require("../modules/userAuth/user.model");

const updateStatusValidation = async (req, res, next) => {
    try {
      const schema = Joi.object({
        userId:Joi.string()
        .required()
        .max(24)
        .messages( {"string.empty": "UserId field cannot be empty."}),
        status:Joi.required().messages( {"string.empty": "Status field cannot be empty."})
    
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
    updateStatusValidation
 
}