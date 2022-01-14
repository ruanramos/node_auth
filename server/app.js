require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const cors = require("cors");

const app = express();

app.use(express.json());

app.options('/login', cors());
app.options('/register', cors());
app.options('/users', cors());

// Register
app.post("/register", cors(), async (req, res) => {
    // our register logic goes here...
    try {
        const { firstName, lastName, email, password } = req.body;

        // validate input
        if (!(email && password && firstName && lastName)) {
            res.statusCode = 400;
            res.send({ message: "All input is required" });

        }
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            res.statusCode = 409;
            res.send({ message: "User already existsAlready Exist. Please Login" });
        }

        //Encrypt user password
        encryptedUserPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(), // sanitize
            password: encryptedUserPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "5h",
            }
        );

        // save user token
        user.token = token;

        // return new user
        res.statusCode = 201;
        res.setHeader("x-auth-token", token);
        res.send(user);




    } catch (err) {
        console.log(err);
    }
});

// Login
app.post("/login", cors(), async (req, res) => {
    // our login logic goes here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.statusCode = 400;
            res.send({ message: "All input is required" });
        }
        // Validate if user exist in our database
        let user = await User.findOne({ email }).lean();

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "5h",
                }
            );

            // save user token
            user.token = token;

            console.log(user);

            // user
            res.statusCode = 201;
            res.setHeader("x-auth-token", token);
            res.send(user);

        }

        res.statusCode = 500;
        return res.send({ message: "User not found" });


    } catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.send({ message: "All input is required" });
    }

});

app.post("/welcome", auth, (req, res) => {
    res.status(200).send({ body: "Welcome to FreeCodeCamp 🙌" });
});

app.get("/users", cors(), auth, async (req, res) => {
    const users = await User.find().lean();

    res.status(200).json(users);
});


module.exports = app;
