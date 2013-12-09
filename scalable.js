(function(globalObj){

    var script,
        divs,
        Scalable = {

        config: function(options) {
            Scalable.scaleType = options.scaleType;
            Scalable.license = options.license;
            this.executeScalable();
        },

        executeScalable: function() {
            if (typeof Scalable.scaleType === "string") {
                Scalable["scale" + Scalable.scaleType]();
            } else if (Scalable.scaleType instanceof Array) {
                for (var i = 0; i < Scalable.scaleType.length; i++) {
                    Scalable["scale" + Scalable.scaleType[i]]();
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
                for(var i = 0; i < divs.length; i++) {
                    divs[i].className += ' scalable';
                }
            }
        }
    };

    if (document) {
        var body,
            configSrc,
            configScript;

        script = document.getElementsByTagName("script")
        script = script[script.length - 1];

        if(script.hasAttribute('data-scale-config')) {
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

    globalObj.Scalable = Scalable;

})(this);