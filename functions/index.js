const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
const stripePaid = require("./routes/stripePaid");
const filters = require("./routes/filters");
const analytics = require("./routes/analytics");
app.use(cors({ origin: true }));

app.post("/stripe", stripePaid);
app.post("/filters", filters);
app.get("/analytics", analytics);

exports.app = functions.https.onRequest(app);
