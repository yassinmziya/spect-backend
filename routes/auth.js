const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

const User = require('../models/user');
const verifyToken = require('../utils/VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const hashedPassword = bcrypt.hashSync(req.body.password, 8); // hash password using bcrypt

    // create User instance
    const user = User.create({
        username,
        firstName,
        lastName,
        password: hashedPassword,
    }).then((user) => {
        var token = jwt.sign({id: user._id}, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        }); // create jwt

        res.status(200).send({
            auth: true,
            token
        });
    }).catch((err) => {
        res.status(401).send({
            auth: false,
            message: err.message
        })
    });
});

// 
router.get('/me', verifyToken, (req, res, next) => {
    const userId = req.userId; // see verifyToken middleware in utils
    User.findById(userId)
    .then((user) => {
        res.status(200).send(user);
    })
    .catch((err) => {
        res.status(404).send("No user found.");
    });
});

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username }).then((user) => {
        if(bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id }, process.env.SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({
                auth: true,
                token
            });
        } else {
            res.status(401).send({ auth: false, token: null });
        }
    });
});

module.exports = router;
