const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    let currentUser;

    await User.findUser(email).then(user => {
        if (!user) {
            return res.status(401).json({ message: "Foydalanuvchi topilmadi!" });
        }
        currentUser = user;
        return bcrypt.compare(password, user.password);
    })
        .then(doMatch => {
            if (!doMatch) {
                return res.status(401).json({ message: "Parol xato!" });
            }

            const token = jwt.sign({
                user: currentUser.email,
                userId: currentUser._id,
            },
                "mysecr8yGU&a=?k$&NpQzt9ev&kE=TPB7+HNAf7@kYd=EhUncxKhP&uC4aPN%GwZtM5v4?tWET4yN=Y263V3xd-uZ*EaN%et",
                { expiresIn: "1h" }
            );

            res.status(201).json({
                token: token,
                user: {
                    id: currentUser._id,
                    user: currentUser.email,
                    firstname: currentUser.firstname,
                    lastname: currentUser.lastname,
                    fax: currentUser.fax,
                    city: currentUser.city,
                    country: currentUser.country,
                    company: currentUser.company,
                    address1: currentUser.address1,
                    address2: currentUser.address2,
                    postCode: currentUser.postCode    
                },
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.signup = async (req, res, next) => {
    const { firstname, lastname, email, telephone, fax, company, address1, address2, city, postCode, country, password, passwordConfirm } = req.body;

    await User.findUser(email).then(user => {
        if (!user) {
            if (password === passwordConfirm) {
                const user = new User(firstname, lastname, email, telephone, fax, company, address1, address2, city, postCode, country, password, passwordConfirm,);
                user.save();
                return res.status(200).json({ message: "Foydalanuvchi tuzildi!" });
            } else {
                return res.status(400).json({ message: "Parol mos kelmadi!" });
            }
        } else {
            return res.status(400).json({ message: "Ushbu username band!" });
        }
    }).catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.getUserUpdate = (req, res) => {
    const db = getDb();
    const { firstname, lastname, email, telephone, fax, company, address1, address2, city, postCode, country, password, passwordConfirm, id } = req.body;
    if (req.file) {
        return db.collection("users").updateOne(
            { _id: ObjectId(id) },
            { $set: {
                    "firstname": firstname,
                    "lastname": lastname,
                    "email": email,
                    "telephone": telephone,
                    "fax": fax,
                    "company": company,
                    "address1": address1,
                    "address2": address2,
                    "city": city,
                    "postCode": postCode,
                    "country": country,
                    "password": password,
                    "passwordConfirm": passwordConfirm
                } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Errors: ' + err);
        })
    } else {
        return db.collection("users").updateOne(
            { _id: ObjectId(id) },
            { $set: {
                    "firstname": firstname,
                    "lastname": lastname,
                    "email": email,
                    "telephone": telephone,
                    "fax": fax,
                    "company": company,
                    "address1": address1,
                    "address2": address2,
                    "city": city,
                    "postCode": postCode,
                    "country": country,
                    "password": password,
                    "passwordConfirm": passwordConfirm
                } },
        ).then((obj) => {
            res.status(200).json({ message: "You are cool!" });
        }).catch((err) => {
            console.log('Error: ' + err);
        })
    }
}

exports.getUserDetail = (req, res) => {
    User.getUserDetail(req.params.id)
        .then(user => res.send(user));
}