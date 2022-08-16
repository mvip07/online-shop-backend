const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");
const Advertising = require("../models/advertising");

exports.getAdvertisings = (req, res) => {
    Advertising.getAdvertising().then(products => {
        return res.json(products);
    });
};

exports.getAdvertisingDetail = (req, res) => {
    Advertising.getAdvertisingDetail(req.params.id)
        .then(product => res.send(product));
}

exports.getAdvertisingUpdate = (req, res) => {
    const db = getDb();
    const { firma, type, image, id } = req.body;
    if (req.file) {
        return db.collection("advertisings").updateOne(
            { _id: ObjectId(id) },
            { $set: { "firma": firma, "type": type, "image": image } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Errors: ' + err);
        })
    } else {
        return db.collection("advertisings").updateOne(
            { _id: ObjectId(id) },
            { $set: { "firma": firma, "type": type, "image": image } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Error: ' + err);
        })
    }
}

exports.createAdvertising = (req, res) => {
    const { firma, type, image } = req.body;

    try {
        const advertising = new Advertising(firma, type, image);
        advertising.createAdvertising();
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.deleteAdvertising = (req, res) => {
    const db = getDb();

    return db.collection("advertisings")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};
