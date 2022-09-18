const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");

class AboutTeamMembar {
    constructor(title, job, description, githubUrl, facebookUrl, twitterUrl, linkedinUrl, image) {
        this.title = title;
        this.job = job;
        this.description = description;
        this.githubUrl = githubUrl;
        this.facebookUrl = facebookUrl;
        this.twitterUrl = twitterUrl;
        this.linkedinUrl = linkedinUrl;
        this.image = image;
        this.createdDate = new Date();
    }

    static getAboutTeamMembar() {
        const db = getDb();

        return db.collection("aboutTeamMembers").find({}).toArray().then(aboutTeamMembars => {
            return aboutTeamMembars.map(aboutTeamMembar => {
                return {
                    _id: aboutTeamMembar._id,
                    title: aboutTeamMembar.title,
                    job: aboutTeamMembar.job,
                    description: aboutTeamMembar.description,
                    githubUrl: aboutTeamMembar.githubUrl,
                    facebookUrl: aboutTeamMembar.facebookUrl,
                    twitterUrl: aboutTeamMembar.twitterUrl,
                    linkedinUrl: aboutTeamMembar.linkedinUrl,
                    image: aboutTeamMembar.image,
                    date: aboutTeamMembar.createdDate
                }
            })
        });
    };

    static getAboutTeamMembarDetail(id) {
        const db = getDb();
        return db.collection("aboutTeamMembers").findOne({ _id: ObjectId(id) }).then(aboutTeamMembar => aboutTeamMembar);
    };

    createAboutTeamMembar() {
        const db = getDb();
        return db.collection("aboutTeamMembers").insertOne(this);
    }
};

module.exports = AboutTeamMembar;
