const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");

class Category {
    constructor(icon, categoryName) {
        this.icon = icon;
        this.categoryName = categoryName;
        this.createdDate = new Date();
    }

    static getCategory() {
        const db = getDb();

        return db.collection("categorys").find({}).toArray().then(categorys => {
            return categorys.map(category => {
                return {
                    _id: category._id,
                    icon: category.icon,
                    categoryName: category.categoryName,
                    date: category.createdDate
                }
            })
        });
    };

    static getCategoryDetail(id) {
        const db = getDb();
        return db.collection("categorys").findOne({ _id: ObjectId(id) }).then(category => category);
    };

    createCategory() {
        const db = getDb();
        return db.collection("categorys").insertOne(this);
    }
};

module.exports = Category;
