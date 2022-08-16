const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");
const AboutCompany = require("../models/aboutCompany");

exports.getAboutCompanys = (req, res) => {
    AboutCompany.getAboutCompanys().then(products => {
        return res.json(products);
    });
};

exports.getAboutCompanyDetail = (req, res) => {
    AboutCompany.getAboutCompanyDetail(req.params.id)
        .then(product => res.send(product));
}

exports.createAboutCompany = (req, res) => {
    const { title, image } = req.body;

    try {
        const aboutCompany = new AboutCompany(title, image);
        aboutCompany.createAboutCompany();
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.getAboutCompanyUpdate = (req, res) => {
    const db = getDb();
    const { title, image, id } = req.body;
    if (req.file) {
        return db.collection("aboutCompanys").updateOne(
            { _id: ObjectId(id) },
            { $set: { "title": title, "image": image } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Errors: ' + err);
        })
    } else {
        return db.collection("aboutCompanys").updateOne(
            { _id: ObjectId(id) },
            { $set: { "title": title, "image": image } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Error: ' + err);
        })
    }
}


exports.deleteAboutCompany = (req, res) => {
    const db = getDb();

    return db.collection("aboutCompanys")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};
