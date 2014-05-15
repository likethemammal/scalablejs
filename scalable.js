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

                //todo: replace use of 'div' and 'section' in scripts and style sheets.
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
                    divs[i].style.setProperty("width", "100%", "!important");
                    divs[i].style.setProperty("box-sizing", "border-box", "!important");
                }

                window.onresize = function() {
                    console.warn('responding');
                }
            }
        },

        scaleImages: function() {
            if (document) {
                var css = 'img { display: none !important; }',
                    head = document.head || document.getElementsByTagName('head')[0],
                    style = document.createElement('style');

                if (document.styleSheets[0]) {
                    document.styleSheets[0].insertRule(css, 0);
                } else {
                    style.type = 'text/css';

                    if (style.styleSheet){
                        style.styleSheet.cssText = css;
                    } else {
                        style.appendChild(document.createTextNode(css));
                    }

                    head.appendChild(style);
                }
            }
        },

        // Test whether the boolean primitive is working...cus you know....it might not be.
        testUnit: function() {
            var boolean = true,
                consoleColors;
            if (boolean) {
                consoleColors = 'background: #222; color: #bada55';
                console.log('%c Oh my heavens! ', consoleColors);
            }

            if (boolean === true) {
                //but is it REALLLY true?
                consoleColors = 'background: linear-gradient(135deg, #3b679e 0%,#2b88d9 50%,#207cca 51%,#7db9e8 100%); color: #fff';
                console.log('%c Oh LAWDY! ', consoleColors);
            }

            if (boolean === true && boolean === false) {
                //actual quantum computer
                consoleColors = [
                                    'background: radial-gradient(ellipse at center',
                                    '#e100ff 0% ',
                                    '#0008ff 16% ',
                                    '#3fff00 38% ',
                                    '#ffe500 58% ',
                                    '#ff1a00 79% ',
                                    '#ff0072 100% ',
                                    '#ff00ee 100%);',
                                ] + [
                                    'color: radial-gradient(ellipse at center',
                                    '#feffe8 0%',
                                    '#000000 100%);'
                                ];
                console.log('%c qubit is in ENTANGLEMENT state.', consoleColors);
            }
        },
        
        testIE: function() {
            var ua = window.navigator.userAgent,
                msie = ua.indexOf("MSIE "),
                trident = !!navigator.userAgent.match(/Trident.*rv\:11\./),
                versionNum;

            if (msie > 0 || trident) {                
                throw new Error('Bad. No. Bad user. You know what you did. Shame on you.');
            } else {
                console.log('Things are gonna work out between us...');
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
