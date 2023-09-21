const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const { SubCategory } = require("../models/model");
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });
const fs = require('fs')
const path = require("path")

router.get("/", async (req, res) => {
    await SubCategory.findAll().then((subcategory) => { res.json({ subcategory: subcategory }) })
})

router.post("/create", imageUpload.upload.single("subcategory_img"), async (req, res) => {
    await SubCategory.create({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        subcategory_img: req.file.filename,
        categoryId: req.body.categoryId
    }).then(() => {
        res.json({ success: "SubKategoriya üstünlikli goşuldy" })
    }).catch((error) => { res.status(500).json({ error: error }) })
});

router.get("/edit/:subcategoryId",  async (req, res) => {
    await SubCategory.findOne({ where: { id: req.params.subcategoryId } }).then((subcategory) => {
        res.json({ subcategory: subcategory })
    })
});

router.post("/edit/:subcategoryId", imageUpload.upload.single("subcategory_img"),  async (req, res) => {
    let img = req.body.category_img;
    if (req.file) {
        img = req.file.filename;
        fs.unlink("/public/img/subcategory/" + img, err => { console.log(err); })
    }
    await SubCategory.update({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        subcategory_img: img,
        categoryId: req.body.categoryId
    }, { where: { id: req.params.subcategoryId } })
        .then(() => { res.json({ success: "Üstünlikli üýtgedildi" }) })
        .catch((error) => { res.status(500).json({ error: error }) })
});

router.delete("/delete/:subcategoryId", async (req, res) => {
    await SubCategory.findOne({ where: { id: req.params.subcategoryId } }).then((subcategory) => {
        if (subcategory) {
            fs.unlink("./public/img/subcategory/" + subcategory.subcategory_img, err => { })
            subcategory.destroy()
            return res.json({ success: "Üstünlikli pozuldy" })
        } else { res.json({ error: "Tapylmady" }) }
    })
});

module.exports = router;