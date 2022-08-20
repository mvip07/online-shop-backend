const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");

class AboutCompany {
    constructor(title, image) {
        this.title = title;
        this.image = image;
        this.createdDate = new Date();
    }

    static getAboutCompanys() {
        const db = getDb();

        return db.collection("aboutCompanys").find({}).toArray().then(aboutCompanys => {
            return aboutCompanys.map(aboutCompany => {
                return {
                    id: aboutCompany._id,
                    image: aboutCompany.image,
                    title: aboutCompany.title,
                    date: aboutCompany.createdDate
                }
            })
        });
    };

    static getAboutCompanyDetail(id) {
        const db = getDb();
        return db.collection("aboutCompanys").findOne({ _id: ObjectId(id) }).then(aboutCompany => aboutCompany);
    };

    createAboutCompany() {
        const db = getDb();
        return db.collection("aboutCompanys").insertOne(this);
    }
};

module.exports = AboutCompany;
