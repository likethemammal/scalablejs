for(var key in window) {
	var obj = window[key];
	if (obj instanceof Object) {
		obj.scalable = true;
	}
}