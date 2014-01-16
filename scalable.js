(function(globalObj){

    var divs,
        Scalable = {

        config: function(options) {
            this.scaleType = options.scaleType;
            this.license = options.license;
            this.testType = options.testType;
            this.executeScaling();
        },

        executeScaling: function() {
            if (typeof this.scaleType === "string") {
                this["scale" + this.scaleType]();
            } else if (this.scaleType instanceof Array) {
                for (var i = 0; i < this.scaleType.length; i++) {
                    this["scale" + this.scaleType[i]]();
                }
            }

            if (this.testType) {
                this.executeTests();
            }
        },

        executeTests: function() {
            if (typeof this.testType === "string") {
                this["test" + this.testType]();
            } else if (this.testType instanceof Array) {
                for (var i = 0; i < this.testType.length; i++) {
                    this["test" + this.testType[i]]();
                }
            }
        },

        // Change all 'div' tags to 'section' tags and copy over all attributes.
        scaleSEO: function() {
            if (document) {
                var numOfDivs,
                    div,
                    section,
                    attr;

                divs = document.getElementsByTagName('div');
                numOfDivs = divs.length;

                for (var i = 0; i < numOfDivs; i++) {
                    div = divs[0];
                    section = document.createElement('section');

                    for (var j = 0; j < div.attributes.length; j++) {
                        attr = div.attributes.item(j);
                        section.setAttribute(attr.nodeName, attr.nodeValue);
                    }

                    section.innerHTML = div.innerHTML;
                    div.parentNode.insertBefore(section, div);
                    div.parentNode.removeChild(div);
                }
            }
        },

        scaleConcurrent: function() {
            //todo: Concurrent scaling
        },

        //Removes all instances of Flash
        scaleHTML5: function() {
            var objects = document.getElementsByTagName('object'),
                embeds = document.getElementsByTagName('embed'),
                els,
                el;

            //Convert NodeLists to Array
            objects = [].slice.call(objects);
            embeds = [].slice.call(embeds);

            els = objects.concat(embeds);

            for (var i = 0; i < els.length; i++) {
                el = els[i];
                if (el.src) {
                    if (el.src.substring(el.src.length - 4, el.src.length) === ".swf") {
                        el.parentNode.removeChild(el);
                    }
                }
                if (el.type === "application/x-shockwave-flash") {
                    el.parentNode.removeChild(el);
                }
            }
        },

        // Loop through all objects and add the 'scalable' and 'optimized' properties.
        scaleBIGDATA: function() {
            var objList = [],
                child,
                childName;

            function traverseObj(obj) {
                for (var i = 0; i < Object.keys(obj).length; i++) {
                    child = obj[Object.keys(obj)[i]];
                    childName = Object.keys(obj)[i];

                    if (child instanceof Object && !(child instanceof Function)) {
                        if (objList.indexOf(childName) < 0) {
                            obj[childName].scalable = true;
                            obj[childName].optimized = true;
                            
                            objList.push(childName);
                            traverseObj(child);
                        }
                    }
                }
            }

            traverseObj(globalObj);
        },

        scaleWeb2: function() {
            if (document) {
                divs = document.getElementsByTagName('div');
                for (var i = 0; i < divs.length; i++) {
                    divs[i].className += ' scalable';
                }

                window.console.log = function(){alert(Array.prototype.slice.call(arguments))};
            }
        },

        // Change the css on all 'divs' to more responsive styles.
        scaleRWD: function() {
            if (document) {
                divs = document.getElementsByTagName('div');
                for (var i = 0; i < divs.length; i++) {
                    divs[i].style.width = "100%";
                    divs[i].style['box-sizing'] = "border-box";
                }

                window.onresize = function() {
                    console.warn('responding');
                }
            }
        },

        // Test whether the boolean primitive is working...cus you know....it might not be.
        testUnit: function() {
            var boolean = true;
            if (boolean) {
                console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
            }
        }
    };

    globalObj.Scalable = Scalable;

    if (document) {
        var body,
            configSrc,
            configScript,
            scripts,
            script;

        scripts = document.getElementsByTagName("script");
        script = scripts[scripts.length - 1];

        if (script.hasAttribute('data-scale-config')) {
            body = document.getElementsByTagName('body')[0];
            configSrc = script.getAttribute('data-scale-config');
            configScript = document.createElement('script');
            configScript.setAttribute('src', configSrc);
            body.appendChild(configScript);
        } else {
            Scalable.config({
                scaleType: 'Web2'
            });
        }
    }

})(this);
