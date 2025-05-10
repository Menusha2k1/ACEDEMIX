const User = require("../Models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: true, message: "Email and password are required" });
    }

    try {
        const userInfo = await User.findOne({ email });

        if (!userInfo) {
            return res.status(400).json({ error: true, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, userInfo.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: true, message: "Invalid credentials" });
        }

        const payload = {
            id: userInfo._id,
            name: userInfo.name,
            email: userInfo.email
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h"
        });

        return res.json({
            error: false,
            message: "Login successful",
            accessToken,
            user: {
                id: userInfo._id,
                username: userInfo.name
            },
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: true, message: "Server error" });
    }
};

exports.createAccount = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    try {
        const isUser = await User.findOne({ email });

        if (isUser) {
            return res.status(409).json({ error: true, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const payload = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "10h"
        });

        return res.status(201).json({
            error: false,
            message: "Registration successful",
            accessToken,
            user: payload
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: true, message: "Server error" });
    }
};
