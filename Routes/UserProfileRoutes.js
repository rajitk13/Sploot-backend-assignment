const express = require("express");

const User = require("../models/user");

const authenticateToken = require("../middleware/auth");
const router = express.Router();

// API endpoint to update user profile
router.patch("/api/users/:userId", authenticateToken, async (req, res) => {
  try {
    const { name, age } = req.body;
    const userId = req.params.userId;

    // Validate inputs
    if (!name || !age) {
      return res.status(400).json({
        statusCode: 400,
        error: "Bad Request",
        message: "Name and age are required",
      });
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, age },
      { new: true }
    );

    // Return success response
    return res.status(200).json({
      statusCode: 200,
      data: {
        data: updatedUser,
      },
      message: "User profile updated successfully",
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
