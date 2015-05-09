svg-reactify
============

[![Build Status](https://travis-ci.org/coma/svg-reactify.png?branch=master)](https://travis-ci.org/coma/svg-reactify)
[![Dependency Status](https://david-dm.org/coma/svg-reactify.png)](http://david-dm.org/coma/svg-reactify)
[![NPM version](https://badge.fury.io/js/svg-reactify.png)](http://badge.fury.io/js/svg-reactify)
![io.js supported](https://img.shields.io/badge/io.js-supported-green.svg?style=flat)

Transform SVG files into React elements.

Setup
-----

Without configuration...

```javascript
var browserify = require('browserify'),
    svgrt      = require('svg-reactify');

browserify({
    transform: [svgrt]
})
.bundle()
```

and with some configuration...

```javascript
var browserify = require('browserify'),
    svgrt      = require('svg-reactify');

browserify({
    transform: [svgrt({
		svgo : {}, // options passed to svgo
		react: {}  // options passed to react-tools
	})]
})
.bundle()
```

Requiring SVG files
-------------------

Now you can do things like...

```javascript
var React = require('react'),
	SVG   = {
	    Dog   : require('images/dog.svg'),
	    Parrot: require('images/parrot.svg'),
	    Horse : require('images/horse.svg')
	};

module.exports = React.createClass({
    render: function () {
        return (
            <h2>Animals</h2>
			<ul>
				<li>
					<SVG.Dog/>
				</li>
				<li>
					<SVG.Parrot/>
				</li>
				<li>
					<SVG.Horse/>
				</li>
			</ul>
        );
    }
});
```