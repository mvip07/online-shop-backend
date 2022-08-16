const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");
const AboutTeamMembar = require("../models/aboutTeamMembar");

exports.getAboutTeamMembars = (req, res) => {
    AboutTeamMembar.getAboutTeamMembar().then(products => {
        return res.json(products);
    });
};

exports.getAboutTeamMembarDetail = (req, res) => {
    AboutTeamMembar.getAboutTeamMembarDetail(req.params.id)
        .then(product => res.send(product));
}

exports.createAboutTeamMembar = (req, res) => {
    const { title, job, description, githubUrl, facebookUrl, twitterUrl, linkedinUrl, image } = req.body;

    try {
        const aboutTeamMembar = new AboutTeamMembar(title, job, description, githubUrl, facebookUrl, twitterUrl, linkedinUrl, image);
        aboutTeamMembar.createAboutTeamMembar();
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.getAboutTeamMembarUpdate = (req, res) => {
    const db = getDb();
    const { title, job, description, githubUrl, facebookUrl, twitterUrl, linkedinUrl, image, id } = req.body;
    if (req.file) {
        return db.collection("aboutTeamMembers").updateOne(
            { _id: ObjectId(id) },
            { $set: {
                "title": title,
                "job": job,
                "description": description,
                "githubUrl": githubUrl,
                "facebookUrl": facebookUrl,
                "twitterUrl": twitterUrl,
                "linkedinUrl": linkedinUrl,
                "image": image,
            } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Errors: ' + err);
        })
    } else {
        return db.collection("aboutTeamMembers").updateOne(
            { _id: ObjectId(id) },
            { $set: {
                    "title": title,
                    "job": job,
                    "description": description,
                    "githubUrl": githubUrl,
                    "facebookUrl": facebookUrl,
                    "twitterUrl": twitterUrl,
                    "linkedinUrl": linkedinUrl,
                    "image": image,
                } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Error: ' + err);
        })
    }
}

exports.deleteAboutTeamMembar = (req, res) => {
    const db = getDb();

    return db.collection("aboutTeamMembers")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};
