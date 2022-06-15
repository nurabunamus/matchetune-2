const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
const stripePaid = require("./routes/stripePaid");
const filters = require("./routes/filters");
app.use(cors({ origin: true }));

app.post("/stripe", stripePaid);
app.post("/filters", filters);

app.get("/", (req, res) => {
  res.json({ msg: "its woek" });
});

exports.app = functions.https.onRequest(app);
