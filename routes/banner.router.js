const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const { Banner } = require("../models/model");
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });
const fs = require('fs')
const path = require("path")

router.get("/", async (req, res) => {
    await Banner.findAll().then((banner) => { res.json({ banner: banner }) })
})

router.post("/create", imageUpload.upload.single("banner_img"), async (req, res) => {
    await Banner.create({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        description_tm: req.body.description_tm,
        description_en: req.body.description_en,
        description_ru: req.body.description_ru,
        url:req.body.url,
        banner_img: req.file.filename
    }).then(() => {
        res.json({ success: "banner üstünlikli goşuldy" })
    }).catch((error) => { res.status(500).json({ error: error }) })
});

router.get("/edit/:bannerId",  async (req, res) => {
    await Banner.findOne({ where: { id: req.params.bannerId } }).then((banner) => {
        res.json({ banner: banner })
    })
});

router.post("/edit/:bannerId", imageUpload.upload.single("banner_img"),  async (req, res) => {
    let img = req.body.banner_img;
    if (req.file) {
        img = req.file.filename;
        fs.unlink("/public/img/banner/" + img, err => { console.log(err); })
    }
    await Banner.update({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        description_tm: req.body.description_tm,
        description_en: req.body.description_en,
        description_ru: req.body.description_ru,
        url:req.body.url,
        banner_img: img
    }, { where: { id: req.params.bannerId } })
        .then(() => { res.json({ success: "Üstünlikli üýtgedildi" }) })
        .catch((error) => { res.status(500).json({ error: error }) })
});

router.delete("/delete/:bannerId", async (req, res) => {
    await Banner.findOne({ where: { id: req.params.bannerId } }).then((banner) => {
        if (banner) {
            fs.unlink("./public/img/banner/" + banner.banner_img, err => { })
            banner.destroy()
            return res.json({ success: "Üstünlikli pozuldy" })
        } else { res.json({ error: "Tapylmady" }) }
    })
});

module.exports = router;