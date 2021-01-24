const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");

router.post("/login",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 8
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        //validation checks
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        //getting the data from req body 
        const { email, password } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            // if not found return error
            if (!user)
                return res.status(400).json({
                    message: "User Not Exist"
                });
            // using bcrypt for the password
            // if not password did not match return error
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password !"
                });

            const payload = {
                user: {
                    id: user.id,
                    username: user.username
                }
            };
            //generating jwt token
            jwt.sign(payload, "someString", {
                expiresIn: 86400
            }, (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    accessToken: token
                });
            }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Error while generating JWT token"
            });
        }
    }
);

module.exports = router;