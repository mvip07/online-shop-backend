const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");
const Category = require("../models/category");

exports.getCategory = (req, res) => {
    Category.getCategory().then(categorys => {
        return res.json(categorys);
    });
};

exports.getCategoryDetail = (req, res) => {
    Category.getCategoryDetail(req.params.id)
        .then(category => res.send(category));
}

exports.getCategoryUpdate = (req, res) => {
    const db = getDb();
    const { icon, categoryName, id } = req.body;
    if (req.file) {
        return db.collection("categorys").updateOne(
            { _id: ObjectId(id) },
            { $set: { "icon": icon, "categoryName": categoryName } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Errors: ' + err);
        })
    } else {
        return db.collection("categorys").updateOne(
            { _id: ObjectId(id) },
            { $set: { "icon": icon, "categoryName": categoryName } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Error: ' + err);
        })
    }
}

exports.createCategory = (req, res) => {
    const { icon, categoryName } = req.body;

    try {
        const category = new Category (icon, categoryName);
        category.createCategory();
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.deleteCategory = (req, res) => {
    const db = getDb();

    return db.collection("categorys")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};
