const Bag = require("../models/bag");
const { ObjectId } = require("mongodb");
const getDb = require("../util/db").getDb;

exports.getBags = (req, res) => {
    Bag.getBags(req.params.userId)
    .then(bag =>  res.json(bag));
};

exports.createBag = (req, res) => {
    const { userId, productId, date, title, brand, color, price, stars, category, discount, model, quantity, description, width, hegth, depth, totalPrice, image } = req.body;

    try {
        const product = new Bag( userId, productId, date, title, brand, color, price, stars, category, discount, model, quantity, description, width, hegth, depth, totalPrice, image);
        product.createBag(req.params.userId);
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.deleteBag = (req, res) => {
    let userId = req.params.userId
    let id = req.params.id
    const db = getDb();
    return db.collection(`bags||${userId}`)
        .deleteOne({ _id: ObjectId(id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};