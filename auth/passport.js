import bcrypt from "bcryptjs";
import User from "../models/User.js";

import passportLocal from "passport-local";

const { LocalStrategy } = passportLocal;

export default function loginCheck(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            console.log("wrong email");
            return done();
          }
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              return done(null, user);
            }
            console.log("Wrong password");
            return done();
          });
        })
        .catch((error) => console.log(error));
    })
  );

  passport.serializeUser((_user, { id }) => {
    done(null, id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
}
