const Joi = require("joi");
const { sendResponse } = require("../helpers/requestHandler.helper");
const { uniqueEmail } = require("./rules");
const { uniquePhone } = require("./rules");

const UserModel = require("../modules/userAuth/user.model");

const registerValidation = async (req, res, next) => {
    try {
      const schema = Joi.object({
        name:Joi.string().required(),
        email: Joi.string().email().required().messages( {"string.empty": "Please add an email.","string.email": "Please add an valid email."}),
        password: Joi.string().required().min(6),
        phoneNumber :Joi.string().required()
        .pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).messages({
            "string.pattern.base": "Invalid phone number."
          }),
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

  const loginValidation = async (req, res, next) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required().messages( {"string.empty": "Please add an email.","string.email": "Please add an valid email."}),
        password: Joi.string().required().min(6),
      });
  
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

  const forgetValidation = async (req, res, next) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required().messages( {"string.empty": "Please add an email.","string.email": "Please add an valid email."})
      });
  
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


  const changePasswordValidation = async (req, res, next) => {
    try {
      const schema = Joi.object({
        
        oldPassword: Joi.string().required().messages( {"string.empty": "Password field cannot be empty."}),
        newPassword: Joi.string().required().messages( {"string.empty": "Password field cannot be empty."})
        
          }).options({ allowUnknown: true });
  
      const { value, error } = schema.validate(req.body);
  
      if (error !== undefined) {
        return sendResponse(res, false, 422, error.details[0].message);
      }
      req.validated = value;
      next();
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    registerValidation,
    loginValidation,
    forgetValidation,
    changePasswordValidation
}