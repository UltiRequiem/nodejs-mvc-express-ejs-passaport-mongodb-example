function dashboardView({user}, response) {
	response.render('dashboard', {user});
}

export {dashboardView};
