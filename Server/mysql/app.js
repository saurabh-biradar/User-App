var express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const dbcon = require("./database").dbconn;
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h3>Welcome!</h3>");
});

app.get("/users", (req, res) => {
  const query = "SELECT * FROM mydb2.user";
  dbcon.query(query, (err, result) => {
    if (err) {
      res.sendStatus(404).end("<p>Users not found!</p>");
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send(result);
    }
  });
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM mydb2.user where _id = ?";
  dbcon.query(query, [id], (err, result) => {
    if (err) {
      res.sendStatus(404).end(`<p>User with id : ${id} is not found!</p>`);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send(result);
    }
  });
});

app.post("/user", (req, res) => {
  var query = `INSERT INTO mydb2.user
          (
              name,profession
          )
          VALUES
          (
              ?,?
          )`;
  const data = req.body;
  let name = data.name;
  let profession = data.profession;
  dbcon.query(query, [name, profession], (err, result) => {
    if (err) {
      res.sendStatus(400).send(`<p>Error saving User!</p>`);
    } else {
      res.status(201).send("User created successfully!");
    }
  });
});

app.delete("/user/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM mydb2.user where _id = ?";
  dbcon.query(query, [id], (err, result) => {
    if (err) {
      res.sendStatus(404).send(`<p>User with id : ${id} is not found!</p>`);
    } else {
      res.status(200).send("User deleted successfully!");
    }
  });
});

app.put("/user/:id", (req, res) => {
  const id = req.params.id;
  const query = "UPDATE mydb2.user set name = ?, profession = ? where _id = ?";
  const data = req.body;
  let name = data.name;
  let profession = data.profession;
  dbcon.query(query, [name, profession, id], (err, result) => {
    if (err) {
      res.sendStatus(404).end(`<p>User with id : ${id} is not found!</p>`);
    } else {
      res.status(204);
    }
  });
});

app.listen(8085, () => {
  console.log("Server is running on port 8085");
});
