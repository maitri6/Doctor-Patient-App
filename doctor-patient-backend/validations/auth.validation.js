const Joi = require("joi");
const { sendResponse } = require("../helpers/requestHandler.helper");

const UserModel = require("../modules/userAuth/user.model");

const registerValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string()
        .required()
        .messages({ "string.empty": "Name field cannot be empty." })
        .pattern(/^[a-zA-Z\\s]*$/),
      email: Joi.string()
        .email()
        .required()
        .messages({
          "string.empty": "Please add an email.",
          "string.email": "Please add an valid email.",
        }),
      password: Joi.string().required(),
      phoneNumber: Joi.string()
        .min(6)
        .required()
        .pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
        .messages({
          "string.pattern.base": "Invalid phone number.",
        }),
      height: Joi.number().required(),
      weight: Joi.number().required(),
      bloodGroup: Joi.string().required().pattern(/^[a-z]/)
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
      email: Joi.string()
        .email()
        .required()
        .messages({ "string.empty": "Please add an email.", "string.email": "Please add an valid email." }),
      password: Joi.string().required()
      .min(6)
      //.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
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
      email: Joi.string()
        .email()
        .required()
        .messages({
          "string.empty": "Please add an email.",
          "string.email": "Please add an valid email.",
        }),
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
      oldPassword: Joi.string()
        .required()
        .min(6)
        .messages({ "string.empty": "Password field cannot be empty." }),
      newPassword: Joi.string()
        .required()
        .min(6)
        .messages({ "string.empty": "Password field cannot be empty." }),
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

const updateProfileValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string()
        .required()
        .messages({ "string.empty": "Name field cannot be empty." }),
      // .pattern(/^[a-zA-Z\\s]*$/),
      phoneNumber: Joi.string()
        .required()
        .pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
        .messages({
          "string.pattern.base": "Invalid phone number.",
        }),
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
  changePasswordValidation,
  updateProfileValidation,
};
