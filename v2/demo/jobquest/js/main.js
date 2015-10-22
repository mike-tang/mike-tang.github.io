//Nav Drawer Toggle
/*
function toggle(id) {
	var target = document.getElementById(id);
	if (target.style.display == "block") {
		target.style.display = "none";
	}
	else {
		target.style.display = "block";
	}
}
*/

//Nav Drawer Toggle/Switch

function toggle(id) {
	var target = document.getElementById(id);
	var targetID = target.id;

	if (targetID == 'signin-drawer') {
		if (target.style.display == 'block') {
			target.style.display = 'none';
		}
		else {
			target.style.display = 'block';
			document.getElementById('signup-drawer').style.display = 'none';
		}
	}
	else if (targetID == 'signup-drawer') {
		if (target.style.display == 'block') {
			target.style.display = 'none';
		}
		else {
			target.style.display = 'block';
			document.getElementById('signin-drawer').style.display = 'none';
		}
	}
}

