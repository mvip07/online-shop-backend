const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");

class Blog {
    constructor(title, description, postIntruder, image) {
        this.title = title;
        this.description = description;
        this.postIntruder = postIntruder;
        this.image = image;
        this.createdDate = new Date();
    }

    static getBlog() {
        const db = getDb();

        return db.collection("blogs").find({}).toArray().then(blogs => {
            return blogs.map(blog => {
                return {
                    _id: blog._id,
                    title: blog.title,
                    description: blog.description,
                    postIntruder: blog.postIntruder,
                    image: blog.image,
                    date: blog.createdDate
                }
            })
        });
    };

    static getBlogDetail(id) {
        const db = getDb();
        return db.collection("blogs").findOne({ _id: ObjectId(id) }).then(blog => blog);
    };

    createBlog() {
        const db = getDb();
        return db.collection("blogs").insertOne(this);
    }
};

module.exports = Blog;
