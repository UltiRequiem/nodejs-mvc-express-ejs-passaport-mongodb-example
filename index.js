import express from "express";
import mongoose from "mongoose";

import LoginRoute from "./routes/login.js";
import { PORT, MONGO_URI } from "./config.js";

mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(LoginRoute);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
