const getDb = require("../util/db").getDb;

class Bag {
    constructor(userId, productId, date, title, brand, color, price, stars, category, discount, model, quantity, description, width, hegth, depth, totalPrice, image) {
        this.userId = userId;
        this.productId = productId;
        this.date = date;
        this.title = title;
        this.brand = brand;
        this.color = color;
        this.price = price;
        this.stars = stars;
        this.category = category;
        this.discount = discount;
        this.model = model;
        this.quantity = quantity;
        this.description = description;
        this.width = width;
        this.hegth = hegth;
        this.depth = depth;
        this.totalPrice = totalPrice;
        this.image = image;
        this.createdDate = new Date();
    }

    static getBags(userId) {
        const db = getDb();
        return db.collection(`bags||${userId}`).find({userId: userId}).toArray().then(bags => {
            return bags.map(bag => {
                return {
                    bagId: bag._id,
                    userId: bag.userId,
                    productId: bag.productId,
                    date: bag.date,
                    title: bag.title,
                    brand: bag.brand,
                    color: bag.color,
                    price: bag.price,
                    stars: bag.stars,
                    category: bag.category,
                    discount: bag.discount,
                    model: bag.model,
                    quantity: bag.quantity,
                    description: bag.description,
                    width: bag.width,
                    hegth: bag.hegth,
                    depth: bag.depth,
                    image: bag.image,
                    totalPrice: bag.totalPrice,
                    bagDate: bag.createdDate
                }
            })
        });
    };

    createBag(userId) {
        const db = getDb();
        return db.collection(`bags||${userId}`).insertOne(this)
     }
};

module.exports = Bag;
