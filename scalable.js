(function(globalObj){

    var divs,
        Scalable = {

        config: function(options) {
            Scalable.scaleType = options.scaleType;
            Scalable.license = options.license;
            this.testType = options.testType;
            this.executeScaling();
        },

        executeScaling: function() {
            if (typeof Scalable.scaleType === "string") {
                Scalable["scale" + Scalable.scaleType]();
            } else if (Scalable.scaleType instanceof Array) {
                for (var i = 0; i < Scalable.scaleType.length; i++) {
                    Scalable["scale" + Scalable.scaleType[i]]();
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
            }
        },

        scaleRWD: function() {
            if (document) {
                divs = document.getElementsByTagName('div');
                for (var i = 0; i < divs.length; i++) {
                    divs[i].style.width = "100%";
                    divs[i].style['box-sizing'] = "border-box";
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