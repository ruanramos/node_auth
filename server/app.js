require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonWebToken");
const auth = require("./middleware/auth");
const cors = require("cors");

const app = express();

app.use(express.json());

app.options('/login', cors());
app.options('/register', cors());

// Register
app.post("/register", cors(), async (req, res) => {
    // our register logic goes here...
    try {
        const { firstName, lastName, email, password } = req.body;

        // validate input
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input is required");
        }
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
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
        res.status(201).json(user);


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
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        let user = await User.findOne({ email });
        console.log(user);

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

            console.log(user.token);
            console.log(user);

            const userT = {user, token: token};
            console.log(userT);
            // user
            return res.status(200).json(userT);
        }

        return res.status(500).send("User not found");

    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred");
    }

});

app.post("/welcome", auth, (req, res) => {
    res.status(200).send({body: "Welcome to FreeCodeCamp 🙌"});
});


module.exports = app;
