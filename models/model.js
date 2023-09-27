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

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    phone_num: { type: DataTypes.INTEGER, allowNull: false },
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

const Services = sequelize.define("services", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    name_tm: {
        type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu servis önem bar!" }, validate: {
            notEmpty: { msg: "Servisin adyny giriziň!" }
        }
    },
    name_en: {
        type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu servis önem bar!" }, validate: {
            notEmpty: { msg: "Servisin adyny giriziň!" }
        }
    },
    name_ru: {
        type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu servis önem bar!" }, validate: {
            notEmpty: { msg: "Servisin adyny giriziň!" }
        }
    },
    description_tm: {
        type: DataTypes.TEXT, allowNull: false, validate: {
            notEmpty: { msg: "Servisin mazmunyny giriziň!" }
        }
    },
    description_en: {
        type: DataTypes.TEXT, allowNull: false, validate: {
            notEmpty: { msg: "Servisin mazmunyny giriziň!" }
        }
    },
    description_ru: {
        type: DataTypes.TEXT, allowNull: false, validate: {
            notEmpty: { msg: "Servisin mazmunyny giriziň!" }
        }
    },
    address: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Adrressini giriziň!", msg_ru: "!", msg_en: "empty!" }
        }
    },
    phone_num: {
        type: DataTypes.INTEGER, allowNull: false, validate: {
            notEmpty: { msg: "Telefon nomerini giriziň!", msg_ru: "", msg_en: "empty!" }
        }
    },
    longitude: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Longitude giriziň!", msg_ru: "!", msg_en: "empty!" }
        }
    },
    latitude: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Latitude giriziň!", msg_ru: "!", msg_en: "empty!" }
        }
    },
    service_img: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Suratyny giriziň!", msg_ru: "!", msg_en: "empty!" }
        }
    },

});

const Review = sequelize.define("reviews", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    stars: {
        type: DataTypes.INTEGER, allowNull: false, validate: {
            notEmpty: { msg: "Yyldyz giriziň!", msg_ru: "Поле не может быть пустым!", msg_en: "field cannot be empty!" }
        }
    },
    comment: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Teswiriňizi giriziň!", msg_ru: "Поле не может быть пустым!", msg_en: "field cannot be empty!" }
        }
    },
    checked: {
        type: DataTypes.TINYINT, allowNull: false, defaultValue: 0
    }

});


const Banner = sequelize.define("banner", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    name_tm: {
        type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu banner önem bar!" }, validate: {
            notEmpty: { msg: "Bannerin adyny giriziň!" }
        }
    },
    name_en: {
        type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu banner önem bar!" }, validate: {
            notEmpty: { msg: "Bannerin adyny giriziň!" }
        }
    },
    name_ru: {
        type: DataTypes.STRING, allowNull: false, unique: { args: true, msg: "Bu banner önem bar!" }, validate: {
            notEmpty: { msg: "Bannerin adyny giriziň!" }
        }
    },
    description_tm: {
        type: DataTypes.TEXT, allowNull: false, validate: {
            notEmpty: { msg: "Bannerin mazmunyny giriziň!" }
        }
    },
    description_en: {
        type: DataTypes.TEXT, allowNull: false, validate: {
            notEmpty: { msg: "Bannerin mazmunyny giriziň!" }
        }
    },
    description_ru: {
        type: DataTypes.TEXT, allowNull: false, validate: {
            notEmpty: { msg: "Bannerin mazmunyny giriziň!" }
        }
    },
    url: {
        type: DataTypes.STRING, allowNull: false
    },
    banner_img: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Surat giriziň!" }
        }
    }
});

Admin.findOrCreate({ where: { email: "admin@gmail.com", password: "$2b$10$.2s8SLEln9Dnql5sPuvtfec93qtcKyvMAqDY8zeLg8IcndoHNtXWS", role: "Admin" } })


Category.hasMany(SubCategory, { onDelete: "cascade", onUpdate: "cascade" })
SubCategory.belongsTo(Category)

SubCategory.hasMany(Services, { onDelete: "cascade", onUpdate: "cascade" })
Services.belongsTo(SubCategory)

User.hasMany(Review, { onDelete: "cascade", onUpdate: "cascade" })
Review.belongsTo(User)

Services.hasMany(Review, { onDelete: "cascade", onUpdate: "cascade" })
Review.belongsTo(Services)

module.exports = {
    Admin,
    Category,
    Contact,
    SubCategory,
    User,
    Services,
    Review,
    Banner
};
