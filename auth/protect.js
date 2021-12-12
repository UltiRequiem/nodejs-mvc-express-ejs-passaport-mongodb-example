export default function protectRoute({ isAuthenticated }, res, next) {
  if (isAuthenticated()) {
    return next();
  }

  console.log("Please log in to continue");
  res.redirect("/login");
}
