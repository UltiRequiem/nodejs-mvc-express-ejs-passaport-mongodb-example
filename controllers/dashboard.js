function dashboardView({user}, res) {
	res.render('dashboard', {user});
}

export {dashboardView};
