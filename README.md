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
    	svgo    : {},   	// options passed to svgo
		react   : {},   	// options passed to react-tools
		template: 'all',	// Choose from all, icon and svg (svg is the default)
		type    : 'icon' 	// Choose from icon and svg (svg is the default)
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

Templates
---------

Templates are a way of ease the use of your svg's and there are three (maybe there will be more in the future, like
one for symbols for example).

All the templates inherit props to allow passing things like ```className```, ```id```...

### SVG Template

The default one, having the ```<svg>``` as the root.

### Icon Template

This one has an ```<span class="icon icon-__SLUG_FROM FILES_NAME__>``` as the root.

### All Template

This one can be configured through the ```type``` prop to finally render as one of the above. The default type
is svg but you can change it passing the type to the transform's config.
