const User = require("../models/User");

// Sign Up
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({
      username,
      email,
      password, // storing plain text password (for demo purposes only)
    });

    await newUser.save();

    res.status(201).json({ msg: "Signup successful", user: newUser });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).send("Server Error");
  }
};

// Login
exports.login = async (req, res) => {
  console.log("Reached login endpoint");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (!user || user.password !== password) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    console.log(user.password + " : " + password);

    res.status(200).json({
      msg: "Login successful",
        email: user.email
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).send("Server Error");
  }
};
