const { deepStrictEqual } = require("assert");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "category_img") {
            cb(null, './public/img/category/');
        }
        else if (file.fieldname === "subcategory_img") {
            cb(null, './public/img/subcategory/');
        }
        else if (file.fieldname === "service_img") {
            cb(null, './public/img/service/');
        }
    },
    filename: function (req, file, cb) {
        if (file.fieldname === "service_img") {
            cb(null, path.parse(file.fieldname).name + "_" + path.parse(file.originalname).name + path.extname(file.originalname));
        } else {
            cb(null, path.parse(file.fieldname).name + "_" + path.parse(req.body.name_tm).name + path.extname(file.originalname));
        }
    }
});

const upload = multer({
    storage: storage
});

module.exports.upload = upload;