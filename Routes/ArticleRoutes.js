const express = require("express");
const Article = require("../models/article")

const router = express.Router();

const authenticateToken = require("../middleware/auth");

// API endpoint to create an article
router.post(
  "/api/users/:userId/articles",
  authenticateToken,
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const authorId = req.params.userId;

      // Validate inputs
      if (!title || !description) {
        return res.status(400).json({
          statusCode: 400,
          error: "Bad Request",
          message: "Title and description are required",
        });
      }

      // Create a new article
      const newArticle = await Article.create({
        title,
        description,
        author: authorId,
      });

      // Return success response
      return res.status(201).json({
        statusCode: 201,
        data: {
          data: newArticle,
        },
        message: "Article created successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        error: "Internal Server Error",
        message: "An error occurred while processing your request",
      });
    }
  }
);

// API endpoint to get all articles
router.get("/api/articles", authenticateToken, async (req, res) => {
  try {
    // Find all articles with author info
    const articles = await Article.find().populate("author");

    // Return success response
    return res.status(200).json({
      statusCode: 200,
      data: {
        data: articles,
      },
      message: "Articles retrieved successfully",
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