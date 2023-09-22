const express = require("express");
const { isAdmin, validateToken } = require("../middlewares/authMiddleware");
const router = express.Router();
const { Review } = require("../models/model");
const axios = require("axios")

router.get("/", isAdmin, async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;
    const offset = (page - 1) * limit;
    var before = offset > 0 ? page - 1 : 1;
    var next = page + 1;
    await Review.findAndCountAll({ limit, offset }).then((reviews) => {
        res.json({
            reviews: reviews.rows,
            pagination: {
                before: before,
                next: next,
                page: page,
                total: reviews.count,
                pages: Math.ceil(reviews.count / limit)
            }
        })
    }).catch((error) => { res.status(500).json({ error: error }) })
});

router.post("/create", validateToken, async (req, res) => {
    const token = req.body.token;
    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY_CAPTCHA}&response=${token}`
        );

        if (response.data.success) {
            await Review.create({
                stars: req.body.stars,
                comment: req.body.comment,
                userId: req.user.id,
                serviceId: req.body.serviceId
            }).then(() => { res.json({ success: "Hatyňyz üstünlikli ugradyldy" }) })
                .catch((error) => { res.status(500).json({ error: error }) })
        } else {
            res.json({ error: "Captcha yalňyş!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Näsazlyk yüze çykdy!" });
    }
});

router.get("/edit/:reviewId", isAdmin, async (req, res) => {
    await Review.findOne({ where: { id: req.params.reviewId } })
        .then((review) => { res.json({ review: review }) })
});

router.post("/edit/:reviewId", isAdmin, async (req, res) => {
    await Review.update(
        {
            checked: req.body.checked
        },
        { where: { id: req.params.reviewId } }).then(() => { res.json({ success: "Üstünlikli üýtgedildi" }); })
        .catch((error) => { res.json({ error: error }) })
});

router.delete("/delete/:reviewId", isAdmin, async (req, res) => {
    await Review.findOne({ where: { id: req.params.reviewId } }).then((review) => {
        if (review) {
            review.destroy();
            return res.json({ success: "Teswir üstünlikli pozuldy" })
        } else { res.json({ error: "Hatyňyz tapylmady" }) }
    }).catch((error) => { res.status(500).json({ error }) })
});

module.exports = router;