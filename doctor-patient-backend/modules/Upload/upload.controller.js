const { uploadDocument } = require("../../helpers/fileupload.helper");
const { sendResponse } = require("../../helpers/requestHandler.helper");
exports.uploadImage = async (req, res) => {
  try {
    let fileName = await uploadDocument(req, res, req.files, "public/images/");
    return sendResponse(
      res,
      true,
      200,
      "File upload successfully",
      fileName[0]
    );
  } catch (err) {
    res.status(500).send({
      message: `Unable to upload the file: ${fileName[0]}. ${err}`,
    });
  }
};
