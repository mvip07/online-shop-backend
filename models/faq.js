const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");

class Faq {
    constructor(heading, inner) {
        this.heading = heading;
        this.inner = inner;
        this.createdDate = new Date();
    }

    static getFaq() {
        const db = getDb();

        return db.collection("faqs").find({}).toArray().then(faqs => {
            return faqs.map(faq => {
                return {
                    _id: faq._id,
                    heading: faq.heading,
                    inner: faq.inner,
                    date: faq.createdDate
                }
            })
        });
    };

    static getFaqDetail(id) {
        const db = getDb();
        return db.collection("faqs").findOne({ _id: ObjectId(id) }).then(faq => faq);
    };

    createFaq() {
        const db = getDb();
        return db.collection("faqs").insertOne(this);
    }
};

module.exports = Faq;
