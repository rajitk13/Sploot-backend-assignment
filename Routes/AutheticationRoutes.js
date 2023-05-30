const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.post("/api/signup", async (req, res) => {
  try {
    const { email, password, name, age } = req.body;

    // Validate inputs
    if (!email || !password || !name || !age) {
      return res.status(400).json({
        statusCode: 400,
        error: "Bad Request",
        message: "All fields are required",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        statusCode: 409,
        error: "Conflict",
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      age,
    });

    // Return success response
    return res.status(201).json({
      statusCode: 201,
      data: {
        data: newUser,
      },
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      error: "Internal Server Error",
      message: "An error occurred while processing your request",
    });
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        statusCode: 400,
        error: "Bad Request",
        message: "Email and password are required",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        error: "Unauthorized",
        message: "Invalid email or password",
      });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        statusCode: 401,
        error: "Unauthorized",
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "secret");

    // Return success response with token
    return res.status(200).json({
      statusCode: 200,
      data: {
        token,
      },
      message: `Login successful, User ID: ${user._id}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      error: "Internal Server Error",
      message: "An error occurred while processing your request",
    });
  }
});

module.exports = router;
