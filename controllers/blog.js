const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");
const Blog = require("../models/blog");

exports.getBlogs = (req, res) => {
    Blog.getBlog().then(products => {
        return res.json(products);
    });
};

exports.getBlogDetail = (req, res) => {
    Blog.getBlogDetail(req.params.id)
        .then(product => res.send(product));
}

exports.createBlog = (req, res) => {
    const { title, description, postIntruder, image } = req.body;

    try {
        const blog = new Blog(title, description, postIntruder, image);
        blog.createBlog();
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.getBlogUpdate = (req, res) => {
    const db = getDb();
    const { title, description, postIntruder, image, id } = req.body;
    if (req.file) {
        return db.collection("blogs").updateOne(
            { _id: ObjectId(id) },
            { $set: {
                "title": title,
                "description": description,
                "postIntruder": postIntruder,
                "image": image,
            } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Errors: ' + err);
        })
    } else {
        return db.collection("blogs").updateOne(
            { _id: ObjectId(id) },
            { $set: {
                "title": title,
                "description": description,
                "postIntruder": postIntruder,
                "image": image,
            } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Error: ' + err);
        })
    }
}


exports.deleteBlog = (req, res) => {
    const db = getDb();

    return db.collection("blogs")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};
