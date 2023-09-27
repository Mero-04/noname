const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const { Services, SubCategory, Category } = require("../models/model");
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });
const fs = require('fs')
const path = require("path")

router.get("/", async (req, res) => {
    await Services.findAll({ include: [{ model: SubCategory}] }).then((services) => { res.json({ services: services }) })
})

router.post("/create", imageUpload.upload.single("service_img"), async (req, res) => {
    await Services.create({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        description_tm: req.body.description_tm,
        description_en: req.body.description_en,
        description_ru: req.body.description_ru,
        service_img: req.file.filename,
        address: req.body.address,
        phone_num: req.body.phone_num,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        subcategoryId: req.body.subcategoryId
    }).then(() => {
        res.json({ success: "Serviss üstünlikli goşuldy" })
    }).catch((error) => { res.status(500).json({ error: error }) })
});

router.get("/edit/:serviceId", async (req, res) => {
    await Services.findOne({ include: { model: SubCategory }, where: { id: req.params.serviceId } }).then((service) => {
        res.json({ service: service })
    })
});

router.post("/edit/:serviceId", imageUpload.upload.single("service_img"), async (req, res) => {
    let img = req.body.category_img;
    if (req.file) {
        img = req.file.filename;
        fs.unlink("/public/img/subcategory/" + img, err => { console.log(err); })
    }
    await Services.update({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        description_tm: req.body.description_tm,
        description_en: req.body.description_en,
        description_ru: req.body.description_ru,
        service_img: img,
        address: req.body.address,
        phone_num: req.body.phone_num,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        subCategoryId: req.body.subCategoryId
    }, { where: { id: req.params.serviceId } })
        .then(() => { res.json({ success: "Üstünlikli üýtgedildi" }) })
        .catch((error) => { res.status(500).json({ error: error }) })
});

router.delete("/delete/:serviceId", async (req, res) => {
    await Services.findOne({ where: { id: req.params.serviceId } }).then((service) => {
        if (service) {
            fs.unlink("./public/img/service/" + service.service_img, err => { })
            service.destroy()
            return res.json({ success: "Üstünlikli pozuldy" })
        } else { res.json({ error: "Tapylmady" }) }
    })
});

module.exports = router;