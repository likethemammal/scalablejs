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

        scaleSEO: function() {
            //todo: SEO scaling
        },

        scaleConcurrent: function() {
            //todo: Concurrent scaling
        },

        scaleHTML5: function() {
            //todo: HTML5 scaling
        },

        scaleBigData: function() {
            for (var key in globalObj) {
                var obj = globalObj[key];
                if (obj instanceof Object) {
                    obj.scalable = true;
                    obj.optimized = true;
                }
            }
        },

        scaleWeb2: function() {
            if (document) {
                divs = document.getElementsByTagName('div');
                for (var i = 0; i < divs.length; i++) {
                    divs[i].className += ' scalable';
                }

                window.console.log = function(text){alert(text)};
            }
        },

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