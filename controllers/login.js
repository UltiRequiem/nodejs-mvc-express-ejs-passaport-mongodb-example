import User from "../models/User.js";
import bcrypt from "bcryptjs";

export function registerView(req, res) {
  res.render("register", {});
}

export function loginView(req, res) {
  res.render("login", {});
}

export function registerUser(
  { name, email, location, password, confirm },
  res
) {
  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  }
  if (password !== confirm) {
    console.log("Password must match");
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("email exists");
        res.render("register", {
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
              .then(res.redirect("/login"))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
}
