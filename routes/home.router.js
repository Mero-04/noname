const express = require("express");
const { isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
const { Category, SubCategory, Services, Review, Banner } = require("../models/model");

router.get("/category", async (req, res) => {
    await Category.findAll().then((category) => {
        { res.json({ category: category }) }
    })
});

router.get("/subcategory", async (req, res) => {
    await SubCategory.findAll().then((subcategory) => {
        { res.json({ subcategory: subcategory }) }
    })
});


router.get("/service", async (req, res) => {
    await Services.findAll({ include: { model: SubCategory } }).then((services) => {
        { res.json({ services: services }) }
    })
})

router.get("/service/:serviceId", async (req, res) => {
    await Services.findAll({
        where: { id: req.params.serviceId },
        include: { model: SubCategory }
    }).then((service) => {
        { res.json({ service: service }) }
    })
})




module.exports = router;