svg-reactify
============

[![Build Status](https://travis-ci.org/coma/svg-reactify.png?branch=v2.x)](https://travis-ci.org/coma/svg-reactify?branch=v2.x)
[![Dependency Status](https://david-dm.org/coma/svg-reactify/v2.x.png)](http://david-dm.org/coma/svg-reactify/v2.x)
[![NPM version](https://badge.fury.io/js/svg-reactify.png)](http://badge.fury.io/js/svg-reactify)

Transform SVG files into React elements.

Configuration
-------------

As with most browserify transforms, you can configure it via the second argument to `bundle.transform`:

```js
bundle.transform(require('svg-reactify'), { default: 'image' });
```

or inside your `package.json` configuration:

```json
{
    "browserify": {
        "transform": [
            ["svg-reactify", { "default": "image" }]
        ]
    }
}
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

You can select one type as default by setting the default option to ```image``` or to ```icon``` and also setting a
regex string like:

```json
{
    "browserify": {
        "transform": [
            ["svg-reactify", { "default": "image", "icon": ".icon" }]
        ]
    }
}
```

### Icon Template

This one has an ```<span class="icon icon-__FILENAME_IN_KEBABCASE__>``` as the root.

### Image Template

The default one, having the ```<svg>``` as the root.
