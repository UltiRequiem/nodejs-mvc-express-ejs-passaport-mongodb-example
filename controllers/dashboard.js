export default function dashboardView({ user }, res) {
  res.render("dashboard", { user });
}
