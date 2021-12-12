export default function protectRoute({ isAuthenticated }, { redirect }, next) {
  if (isAuthenticated()) {
    return next();
  }

  console.log("Please authenticate to continue");
  redirect("/login");
}
