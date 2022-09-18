const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");
const Faq = require("../models/faq");

exports.getFaq = (req, res) => {
    Faq.getFaq().then(faqs => {
        return res.json(faqs);
    });
};

exports.getFaqDetail = (req, res) => {
    Faq.getFaqDetail(req.params.id)
        .then(faq => res.send(faq));
}

exports.getFaqUpdate = (req, res) => {
    const db = getDb();
    const { heading, inner, id } = req.body;
    if (req.file) {
        return db.collection("faqs").updateOne(
            { _id: ObjectId(id) },
            { $set: { "heading": heading, "inner": inner } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Errors: ' + err);
        })
    } else {
        return db.collection("faqs").updateOne(
            { _id: ObjectId(id) },
            { $set: { "heading": heading, "inner": inner } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Error: ' + err);
        })
    }
}

exports.createFaq = (req, res) => {
    const { heading, inner } = req.body;

    try {
        const faq = new Faq (heading, inner);
        faq.createFaq();
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.deleteFaq = (req, res) => {
    const db = getDb();

    return db.collection("faqs")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};
