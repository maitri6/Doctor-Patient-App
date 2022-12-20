const UserModel = require("./user.model");
const bcrypt = require("bcrypt");
const { sendResponse } = require("../../helpers/requestHandler.helper");
const { generateJwt } = require("../../helpers/jwt.helper");

/**
 * Description: Register user into the application
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.register = async(req, res, next) => {
    try {
        const checkUser = await UserModel.findOne({ email: req.body.email });
        if (checkUser) return sendResponse(res, true, 400, "Email already exists..");
        req.body.password = await bcrypt.hash(req.body.password, 10);
        let saveUser = await UserModel.create(req.body);
        return sendResponse(
            res,
            true,
            200,
            "OTP sent successfully.",
            saveUser
        );
    } catch (error) {
        console.log("error", error);
    }
};

/**
 * Description: Login user into the application
 * @param { email, password } req
 * @param {*} res
 * @param {*} next
 */
exports.login = async(req, res, next) => {
    try {

        let email = req.body.email;
        let password = req.body.password;

        const getUser = await UserModel.findOne({ email: email });
        if (!getUser) return sendResponse(res, true, 400, "Email already exists.");

        if (getUser && !(await bcrypt.compare(password, getUser.password)))
            return sendResponse(res, true, 400, "Invalid password.");

        let token = await generateJwt({ userId: getUser._id });
        if (token === undefined) {
            return sendResponse(
                res,
                false,
                400,
                "Something went wrong please try again."
            );
        }
        return sendResponse(res, true, 200, "OTP sent successfully.", {
            getUser,
            token,
        });
    } catch (error) {
        console.log(error, "error")
    }
};