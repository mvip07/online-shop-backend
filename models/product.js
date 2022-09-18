const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");

class Product {
    constructor(title, brand, color, price, stars, category, discount, model, quantity, description, width, hegth, depth, image) {
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
        this.image = image;
        this.createdDate = new Date();
    }

    static getProducts() {
        const db = getDb();

        return db.collection("products").find({}).toArray().then(products => {
            return products.map(product => {
                return {
                    _id: product._id,
                    title: product.title,
                    brand: product.brand,
                    color: product.color,
                    price: product.price,
                    stars: product.stars,
                    category: product.category,
                    discount: product.discount,
                    model: product.model,
                    quantity: product.quantity,
                    description: product.description,
                    width: product.width,
                    hegth: product.hegth,
                    depth: product.depth,
                    image: product.image,
                    date: product.createdDate
                }
            })
        });
    };

    static getProductDetail(id) {
        const db = getDb();
        return db.collection("products").findOne({ _id: ObjectId(id) }).then(product => product);
    };

    createProduct() {
        const db = getDb();
        return db.collection("products").insertOne(this);
    }
};

module.exports = Product;
