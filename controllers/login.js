import User from "../models/User.js";
import bcrypt from "bcryptjs";

export function registerView(_req, { render }) {
  render("register", {});
}

export function loginView(_req, { render }) {
  render("login", {});
}

export function registerUser(
  { body: { name, email, location, password, confirm } },
  { redirect, render }
) {
  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  }
  if (password !== confirm) {
    console.log("Password must match");
    redirect("/login");
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("email exists");
        render("register", {
          name,
          email,
          password,
          confirm,
        });
      } else {
        const newUser = new User({
          name,
          email,
          location,
          password,
        });
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            newUser.password = hash;
            newUser
              .save()
              .then(redirect("/login"))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
}

export function loginUser({ body: { email, password } }, res) {
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email,
      password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res);
  }
}
