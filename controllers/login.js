import { User } from "../models/index.js";
import passport from "passport";
import bcrypt from "bcryptjs";

export function registerView(_req, res) {
  res.render("register", {});
}

export function loginView(_req, res) {
  res.render("login", {});
}

export function registerUser(
  { body: { name, email, location, password, confirm } },
  res,
) {
  if (!name || !email || !password || !confirm) {
    res.redirect("/login");
  }

  if (password !== confirm) {
    res.redirect("/login");
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      res.render("register", { name, email, password, confirm });
    }

    const newUser = new User({ name, email, location, password });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        throw err;
      }

      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }

        newUser.password = hash;
        newUser.save().then(res.redirect("/login"));
      });
    });
  });
}

export function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.render("login", { email, password });
  }

  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res);
}
