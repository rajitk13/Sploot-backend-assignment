const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://RAJIT:rpmsite123@rpm-site.64o2n.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", false);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
