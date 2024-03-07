const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.CONNECTION_STRING).then(() => console.log("Connected to MongoDB.."));
const userSchema = mongoose.Schema({
  name: String,
  profession: String
});
const User = mongoose.model("User", userSchema);
module.exports = User;
