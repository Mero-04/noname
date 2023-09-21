const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const { Category } = require("../models/model");
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });
const fs = require('fs')
const path = require("path")

router.get("/", async (req, res) => {
    await Category.findAll().then((category) => { res.json({ category: category }) })
})

router.post("/create", imageUpload.upload.single("category_img"), async (req, res) => {
    await Category.create({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        category_img: req.file.filename
    }).then(() => {
        res.json({ success: "Kategoriya üstünlikli goşuldy" })
    }).catch((error) => { res.status(500).json({ error: error }) })
});

router.get("/edit/:categoryId",  async (req, res) => {
    await Category.findOne({ where: { id: req.params.categoryId } }).then((category) => {
        res.json({ category: category })
    })
});

router.post("/edit/:categoryId", imageUpload.upload.single("category_img"),  async (req, res) => {
    let img = req.body.category_img;
    if (req.file) {
        img = req.file.filename;
        fs.unlink("/public/img/category/" + img, err => { console.log(err); })
    }
    await Category.update({
        name_tm: req.body.name_tm,
        name_en: req.body.name_en,
        name_ru: req.body.name_ru,
        category_img: img
    }, { where: { id: req.params.categoryId } })
        .then(() => { res.json({ success: "Üstünlikli üýtgedildi" }) })
        .catch((error) => { res.status(500).json({ error: error }) })
});

router.delete("/delete/:categoryId", async (req, res) => {
    await Category.findOne({ where: { id: req.params.categoryId } }).then((category) => {
        if (category) {
            fs.unlink("./public/img/category/" + category.category_img, err => { })
            category.destroy()
            return res.json({ success: "Üstünlikli pozuldy" })
        } else { res.json({ error: "Tapylmady" }) }
    })
});

module.exports = router;