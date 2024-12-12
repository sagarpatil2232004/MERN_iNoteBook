const express = require("express")
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Users = require("../models/users")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const fetchuser = require("../middleware/fetchuser");



//to use req.body
router.use(express.json());

const success = false;


// Route 1 : create a user with a unique email /api/auth/creatUser. No login required
router.post("/createUser", [
    body('name', 'Please Enter your name').isLength({ min: 1 }),
    body('email', 'Please Enter a valid mail').isEmail(),
    body('password', 'Please Enter password with at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json("Please enter valid details");
    }



    try {

        let user = await Users.findOne({ email: req.body.email });

        if (user) {
            return res.status(409).json({ error: "A user with this email already exists" });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);
            user = await Users.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
            })

            const JwtSecretKey = 'Sagar#Topper#VITPune';

            const data = {
                user: {
                    id: user.id,
                }
            }

            const authToken = jwt.sign(data, JwtSecretKey);

            const success = true;

            res.json({ success, authToken });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})




// Route 2 : login a user  /api/auth/login. No login required. 
router.post("/login", [
    body('email', 'Please Enter a valid mail').isEmail(),
    body('password', 'Password field cannot be empty').exists(),
], async (req, res) => {

    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json("Please enter valid details");
    }



    try {

        let user = await Users.findOne({ email: req.body.email });

        if (!user) {
            return res.status(409).json({ error: "Invalid Credintials" });
        }

        const comparepasswords = await bcrypt.compare(req.body.password, user.password);

        console.log("compare password",comparepasswords);

        if (!comparepasswords) {
            return res.status(409).json({ error: "Invalid Credintials" });
        }

        const data = {
            user: {
                id: user.id,
            }
        }

        const JwtSecretKey = 'Sagar#Topper#VITPune';

        const authToken = jwt.sign(data, JwtSecretKey);

        const success = true;

        res.json({ success,authToken});

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})



// Route 3 : get a user by verifying authToken  /api/auth/getUser. login required.
router.post("/getUser", fetchuser, async (req, res) => {

    try {
        const userID = req.user.id;

        const user = await Users.findById(userID).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;