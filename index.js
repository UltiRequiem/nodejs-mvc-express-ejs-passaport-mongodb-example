import { default as express, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";

import { Login } from "./routes/index.js";
import loginCheck from "./auth/passport.js";
import { PORT, MONGO_URI } from "./config.js";

// loginCheck(passport);

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

app.use(urlencoded({ extended: false }));

app.use(
  session({
    secret: "oneboy",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(Login);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
