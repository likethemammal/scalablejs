ScalableJS
==========

Automatically scales any web app perfectly. For realzies, good dealzies.

[Patent Pending: #8,589,425](http://www.google.com/patents/US8589425)

## Installation

Just drop the script in wherever you'd like. You can add config options into a file that's referenced by the `data-scale-config` attribute.

```html


<script data-scale-config="scale-config.js" src="js/lib/scalable.js"></script>

```

## Usage

Scalable can be used without setting any config options by just not including the `data-scale-config` attribute. Otherwise, options can be set by creating a file and naming it the same thing as the path set in `data-scale-config`. In this case the file would be named "scale-config.js".

The config options are set much like [RequireJS](http://requirejs.org/docs/api.html#config). Right now the only option is `scaleType`. It can be either a single string or an array of strings that define the type of scalableness desired.

```js


Scalable.config({
    scaleType: 'Web2'
});

```

### Scale Types

The current types of scalability are:

 * `Web2` for Web 2.0.
 * `BIGDATA` for big data.
 * `RWD` for responsive web design.
 * `HTML5` for HTML5.
 * `Images` for images.
 * `SEO` for search engine optimization.

If no configurations are set Scalable will just scale for Web 2.0 by default.

## Contributing

Feel free to submit a pull request of any code that you've found to automatically scale JS code. We follow a super-strict coding standard documented [here](https://github.com/airbnb/javascript), but if you don't follow it it's no biggy.

## License

This library is licensed under the [WTFPL](http://www.wtfpl.net/about/).
