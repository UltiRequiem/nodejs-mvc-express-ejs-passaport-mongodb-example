import User from "../models/User.js";
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
  res
) {
  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
    res.redirect("/login");
  }

  if (password !== confirm) {
    console.log("Password must match");
    res.redirect("/login");
    return;
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      console.log("email exists");
      res.render("register", {
        name,
        email,
        password,
        confirm,
      });
      return;
    }

    const newUser = new User({
      name,
      email,
      location,
      password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(res.redirect("/login"))
          .catch((err) => console.log(err));
      });
    });
  });
}

export function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email,
      password,
    });

    return;
  }

  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res);
}
