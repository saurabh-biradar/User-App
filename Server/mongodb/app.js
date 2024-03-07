var express = require("express");
var path = require("path");
var cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./database");
const app = express();
const PORT = parseInt(process.env.PORT);
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h3>Welcome!</h3>");
});

app.get("/users", async (req, res) => {
  const data = await User.find({});
  res.send(data);
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.send(user);
});

app.post("/user", async (req, res) => {
  try {
    const createUser = await User.create(req.body);
    if (!createUser) {
      res.status(400).json({ message: "Error while creating new User" });
    }
    else {
      res.status(201).json({ message: "User created successfully!" });
    }
  }
  catch {
    console.error('Error creating user:', err);
    res.status(500).send({ message: 'Error creating user' });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send({ message: 'Error deleting user' });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updates);
    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User updated successfully', user: updatedUser });
  }
  catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send({ message: 'Error updating user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
