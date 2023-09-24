const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const morgan = require('morgan')
const cors = require("cors");
const sequelize = require('./data/db');
// const helmet = require("helmet");
// const apilimiter = require("./middlewares/rateLimit");
// app.use("/api", apilimiter)


app.use(express.json());
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cors());
// app.use(helmet());
app.use(morgan('tiny'));
app.use('/api', express.static('public'))


const AuthRouter = require("./routes/auth.router")
const CategoryRouter = require("./routes/category.router")
const SubCategoryRouter = require("./routes/subcategory.router")
const ContactRouter = require("./routes/contact.router")
const ServiceRouter = require("./routes/service.router")
const ReviewRouter = require("./routes/review.router")
const BannerRouter = require("./routes/banner.router")

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/subcategory", SubCategoryRouter);
app.use("/api/v1/contact", ContactRouter);
app.use("/api/v1/service", ServiceRouter);
app.use("/api/v1/review", ReviewRouter);
app.use("/api/v1/banner", BannerRouter);


app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})