const DoctorModel = require("../doctor/doctor.model");
const UserModel = require("../userAuth/user.model");
const AdminModel = require("../admin/admin.model");
const { sendResponse } = require("../../helpers/requestHandler.helper");
const { IDENTITY_PROOF } = require('../../config/constant');

exports.updateStatus = async (req, res, next) => {
  try {
    let getUser = await UserModel.findById(req.body.userId);
    console.log(req.body.isApproved);

    console.log("hii");
    if (getUser && !(getUser.isApproved)) {
      console.log("inside");
      const filter_1 = {
        _id: getUser._id,
      };

      const update1 = {
        $set: {
          isApproved: true,
        },
      };

      await UserModel.updateOne(filter_1, update1);
    }
    else if (getUser.isApproved) {
      console.log("else");
      const filter_2 = {
        _id: getUser._id,
      };

      const update2 = {
        $set: {
          isApproved: false,
        },
      };
      await UserModel.updateOne(filter_2, update2);
    }
    console.log(req.body.isApproved);

    return sendResponse(
      res,
      false,
      400,
      "Something went wrong please try again."
    );

  } catch (error) {
    console.log("error", error);
  }
};