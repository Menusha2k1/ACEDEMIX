const User = require("../Models/user_model");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: true, message: "Email and password are required" });
    }

    const userInfo = await User.findOne({ email });

    if (!userInfo) {
        return res.status(400).json({ error: true, message: "User not found" });
    }

    if (userInfo.email === email && userInfo.password === password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        // Store user's name in local storage
        localStorage.setItem('userName', userInfo.name);

        return res.json({ error: false, message: "Login successful", email, accessToken, name: userInfo.name});
    } else {
        return res.status(400).json({ error: true, message: "Invalid credentials" });
    }
};

exports.createAccount = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
        return res.json({ error: true, message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    // Store user's name in local storage
    localStorage.setItem("userName", name);

    return res.json({ error: false, user, accessToken, message: "Registration successful", name: user.name });
};