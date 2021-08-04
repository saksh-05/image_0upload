const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongo DB success");
});

const imgRouter = require("./routes/record");
app.use("/upload", imgRouter);

app.get("/", (req, res) => {
  res.send("Image Page");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
} else {
  app.use(express.static("images"));
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
