const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");
const Product = require("../models/product");

exports.getProducts = (req, res) => {
    Product.getProducts().then(products => {
        return res.json(products);
    });
};

exports.getProductDetail = (req, res) => {
    Product.getProductDetail(req.params.id)
        .then(product => res.send(product));
}

exports.createProduct = (req, res) => {
    const { title, brand, color, price, stars, category, discount, model, quantity, description, width, hegth, depth, image } = req.body;

    try {
        const product = new Product(title, brand, color, price, stars, category, discount, model, quantity, description,  width, hegth, depth, image);
        product.createProduct();
        return res.status(200).json({ message: "You are cool!" });
    } catch (err) {
        return res.status(500).json({ err: err, message: "Something is wrong!" });
    }
};

exports.getProductUpdate = (req, res) => {
    const db = getDb();
    const { title, brand, color, price, stars, category, discount, model, quantity, description, width, hegth, depth, image, id } = req.body;
    if (req.file) {
        return db.collection("products").updateOne(
            { _id: ObjectId(id) },
            { $set: {
                "title" : title,
                "brand": brand,
                "color": color,
                "price": price,
                "stars": stars,
                "category": category,
                "discount": discount,
                "model": model,
                "quantity": quantity,
                "description": description,
                "width": width,
                "hegth": hegth,
                "depth": depth,
                "image": image,
            } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Errors: ' + err);
        })
    } else {
        return db.collection("products").updateOne(
            { _id: ObjectId(id) },
            { $set: {
                    "title" : title,
                    "brand": brand,
                    "color": color,
                    "price": price,
                    "stars": stars,
                    "category": category,
                    "discount": discount,
                    "model": model,
                    "quantity": quantity,
                    "description": description,
                    "width": width,
                    "hegth": hegth,
                    "depth": depth,
                    "image": image,
                } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Error: ' + err);
        })
    }
}

exports.deleteProduct = (req, res) => {
    const db = getDb();
    return db.collection("products")
        .deleteOne({ _id: ObjectId(req.params.id) })
        .then(() => res.status(200).json({ message: "You are cool!" }))
        .catch(() => res.status(500).json({ message: "You are not cool!" }));
};
