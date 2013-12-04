var globalObj = this
for(var key in globalObj) {
	var obj = globalObj[key];
	if (obj instanceof Object) {
		obj.scalable = true;
	}
}