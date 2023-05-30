const port = process.env.PORT || 3000;
require("./db/mongoose");

const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");
// const User = require("./models/user");
// const Article = require("./models/article");

// Connect to MongoDB

const app = express();
app.use(express.urlencoded());


const ArticleRoutes = require("./Routes/ArticleRoutes");
const AutheticationRoutes = require("./Routes/AutheticationRoutes");
const UserProfileRoutes = require("./Routes/UserProfileRoutes");

app.use("/", ArticleRoutes);
app.use("/", AutheticationRoutes);
app.use("/", UserProfileRoutes);
// Start the server
app.listen(port, () => {
  console.log("Server is running on http://localhost:3000");
});
