const { DataTypes } = require('sequelize');
const sequelize = require("../data/db");

const Admin = sequelize.define("admin", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "User", allowNull: false },
});

const Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    name_tm: {
        type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu kategoriýa önem bar!" }, validate: {
            notEmpty: { msg: "Kategoriýanyň adyny giriziň!" }
        }
    },
    name_en: {
        type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu kategoriýa önem bar!" }, validate: {
            notEmpty: { msg: "Kategoriýanyň adyny giriziň!" }
        }
    },
    name_ru: {
        type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu kategoriýa önem bar!" }, validate: {
            notEmpty: { msg: "Kategoriýanyň adyny giriziň!" }
        }
    },
    category_img: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Surat giriziň!" }
        }
    }
});

const SubCategory = sequelize.define("subcategory", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    name_tm: {
        type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu SubKategoriýa önem bar!" }, validate: {
            notEmpty: { msg: "SubKategoriýanyň adyny giriziň!" }
        }
    },
    name_en: {
        type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu SubKategoriýa önem bar!" }, validate: {
            notEmpty: { msg: "SubKategoriýanyň adyny giriziň!" }
        }
    },
    name_ru: {
        type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu SubKategoriýa önem bar!" }, validate: {
            notEmpty: { msg: "SubKategoriýanyň adyny giriziň!" }
        }
    },
    subcategory_img: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Surat giriziň!" }
        }
    }
});


 
const Contact = sequelize.define("contact", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Adyňyzy giriziň!", msg_ru: "Поле имени не может быть пустым!", msg_en: "Name field cannot be empty!" }
        }
    },
    email: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "E-poçtaňyzy giriziň!", msg_ru: "Поле электронной почты не может быть пустым!", msg_en: "Email field cannot be empty!" }
        }
    },
    subject: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Teswiriňiziň temasyny giriziň!", msg_ru: "Поле темы не может быть пустым!", msg_en: "Subject field cannot be empty!" }
        }
    },
    comment: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Teswiriňizi giriziň!", msg_ru: "Поле комментария не может быть пустым!", msg_en: "Comment field cannot be empty!" }
        }
    },
    phone_num: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Nomeriňizi giriziň!", msg_ru: "Поле для номера телефона не может быть пустым!", msg_en: "Phone number cannot be empty!" }
        }
    },

});


Admin.findOrCreate({ where: { email: "admin@gmail.com", password: "$2b$10$.2s8SLEln9Dnql5sPuvtfec93qtcKyvMAqDY8zeLg8IcndoHNtXWS", role: "Admin" } })


Category.hasMany(SubCategory, { onDelete: "cascade", onUpdate: "cascade" })
SubCategory.belongsTo(Category)


module.exports = {
    Admin,
    Category,
    Contact,
    SubCategory
    };
