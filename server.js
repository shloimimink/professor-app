const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const db = require("./queries");

const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/professors", db.getAllProfessors);
app.post("/professors", db.addProfessor);
app.get("/professors/:id", db.getProfessorById);
app.patch("/professors/:id", db.updateProfessorById);
app.delete("/professors/:id", db.deleteProfessorById);

app.get("/reviews", db.allReviews);
app.post("/reviews", db.createReview);
app.get("/reviews/:id", db.getProfessorReviews);
app.patch("/reviews/:id", db.updateReview);
app.delete("/reviews/:id", db.deleteReview);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
