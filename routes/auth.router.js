const express = require('express');
const router = express.Router();
const { Admin, User } = require('../models/model');
const { sign } = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { validateToken } = require("../middlewares/authMiddleware");

router.post("/rootman", async (req, res) => {
    const { email, password } = req.body;
    await Admin.findOne({ where: { email: email } })
        .then(admin => {
            if (!admin || admin.email !== email) {
                res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, admin.password)
                if (!passwordIsValid) {
                    res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
                } else {
                    res.json({
                        token: sign({ id: admin.id, role: admin.role }, process.env.JWT_key, {
                            expiresIn: '24h'
                        })
                    });
                }
            }
        })
});

router.post("/register", async (req, res) => {
    const { name, phone_num, password } = req.body;
    const user = await User.findOne({ where: { phone_num: phone_num } });
    if (!user) {
        var hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await User.create({
                name: name,
                phone_num: phone_num,
                password: hashedPassword
            });
            res.json({
                token: sign({ id: user.id, role: user.role }, process.env.JWT_key, {
                    expiresIn: '24h'
                })
            });
        }
        catch (err) {
            console.log(err)
        }
    } else {
        res.json({ error: "Sizin nomeriniz bilen on hasap acylypdyr" })
    }
})

router.post("/login", async (req, res) => {
    const { phone_num, password } = req.body;
    await User.findOne({ where: { phone_num: phone_num } })
        .then(user => {
            if (!user || user.phone_num !== phone_num) {
                res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, user.password)
                if (!passwordIsValid) {
                    res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
                } else {
                    res.json({
                        token: sign({ id: user.id, role: user.role }, process.env.JWT_key, {
                            expiresIn: '24h'
                        })
                    });
                }
            }
        })
});

router.get("/current_user", validateToken, async (req, res) => {
    res.json(req.user)
});


module.exports = router;