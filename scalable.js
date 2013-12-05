var globalObj = this,
	divs = document.getElementsByTagName('div');
for(var key in globalObj) {
    var obj = globalObj[key];
    if (obj instanceof Object) {
        obj.scalable = true;
    }
}

for(var i = 0; i < divs.length; i++) {
	divs[i].className += ' scalable';
}