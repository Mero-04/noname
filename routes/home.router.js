const express = require("express");
const { isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
const { Category, SubCategory, Services, Review, Banner, User } = require("../models/model");
const { Op } = require("sequelize");
const Sequelize = require('../data/db');

router.get("/category", async (req, res) => {
    Category.findAll({
        include: [{
            model: SubCategory
        }]
    }).then((category) => {
        return res.json({ category: category })
    })
});

router.get("/category/:categoryId", async (req, res) => {
    SubCategory.findAll({
        include: [{
            model: Category
        }],
        where: { categoryId : req.params.categoryId}
    }).then((subcategory) => {
        return res.json({ subcategory: subcategory })
    })
});

router.get("/subcategory", async (req, res) => {
    await SubCategory.findAll({
        include: [
            {model: Category}
        ]
    }).then((subcategory) => {
        { res.json({ subcategory: subcategory }) }
    })
});

router.get("/subcategory/:subcategoryId", async (req, res) => {
    await Services.findAll({
        include: [
            {model: SubCategory},
            {model: User}
        ],
        where: {subcategoryId: req.params.subcategoryId}
    }).then((services) => {
        { res.json({ services: services }) }
    })
});


router.get("/service", async (req, res) => {
    const search = req.query.search || "";
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 16;
    const offset = (page - 1) * limit;
    var before = offset > 0 ? page - 1 : 1;
    var next = page + 1;
    await Services.findAndCountAll({
        offset,
        limit,
        include: { model: SubCategory },
        order: [
            ["id", "DESC"]
        ],
        where: {
            [Op.or]: [
                { name_tm: { [Op.like]: '%' + search + '%' } },
                { name_en: { [Op.like]: '%' + search + '%' } },
                { name_ru: { [Op.like]: '%' + search + '%' } }
            ]
        }
    }).then((services) => {
        {
            res.json({
                services: services.rows,
                pagination: {
                    before: before,
                    next: next,
                    page: page,
                    total: services.count,
                    pages: Math.ceil(services.count / limit)
                }
            })
        }
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



// service gora review getiryar, star sany kopi basda getiryar
router.get("/review/:serviceId", async (req, res) => {
    await Review.findAll({
        order: [
            ["stars", "DESC"]
        ],
        where: { serviceId: req.params.serviceId },
        include: [
            { model: User },
            { model: Services }
        ]
    }).then((review) => {
        { res.json({ review: review }) }
    })
})



module.exports = router;