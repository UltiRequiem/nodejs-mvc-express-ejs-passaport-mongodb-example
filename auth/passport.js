import bcrypt from "bcryptjs";
import passportLocal from "passport-local";

import User from "../models/User.js";

export default function loginCheck(passport) {
  passport.use(
    new passportLocal.Strategy(
      { usernameField: "email" },
      (email, password, done) => {
        User.findOne({ email: email }).then((user) => {
          if (!user) {
            console.log("wrong email");
            return done();
          }
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) return done(null, user);

            console.log("Wrong password");
            return done();
          });
        });
      }
    )
  );

  passport.serializeUser((_user, { id }) => done(null, id));

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => done(error, user));
  });
}
