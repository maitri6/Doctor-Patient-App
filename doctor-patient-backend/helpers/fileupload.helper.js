// const util = require('util');
// const multer = require('multer');
// const path = require('path')
// const maxsize = 2 * 1024 * 1024;

// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "/resources/static/assets/uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.filename + "_" + Date.now() + path.extname(file.originalname));
//     }
// });

// let uploadFile = multer({
//     storage: storage,
//     limits: {
//         fileSize: maxsize,
//     }
// }).single("file");

// module.exports = uploadFile;

exports.uploadDocument = async(req, res, files, folder_path) => {

    const file = files.image
    let uniqueName = [],
        URL, img, fileName, ext, splitName, name;
    if (file.length >= 2) {
        for (const element of file) {
            img = element;
            fileName = img.name.split(".");
            ext = fileName.pop();
            splitName = fileName.join("");
            name = (splitName + "-" + Date.now() + "." + ext).split(" ").join("_");
            uniqueName.push(name);
            URL = folder_path + name;

            img.mv(URL, (err) => {
                if (err)
                    return sendResponse(res, false, 201, "Something Went Wrong", err);
            });
        }
        return uniqueName;
    } else {
        img = file;
        fileName = img.name.split(".");
        ext = fileName.pop();
        splitName = fileName.join("");
        name = (splitName + "-" + Date.now() + "." + ext).split(" ").join("_");
        uniqueName.push(name);
        URL = folder_path + name;

        img.mv(URL, (err) => {
            if (err)
                return sendResponse(res, false, 201, "Something Went Wrong", err);
        });
        return uniqueName;
    }
};