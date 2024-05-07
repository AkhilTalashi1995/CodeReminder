const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { questionRouter } = require("./routes/questions_route");
// const { profileRouter } = require("./routes/profile_routes");
const cors = require("cors");
require("dotenv").config();
app.use(cors());

app.use(express.json());
  app.use("/v1/questions", questionRouter);
  //app.use("/v1/profile", profileRouter);

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
  });

module.exports = app;
