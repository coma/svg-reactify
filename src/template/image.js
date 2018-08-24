export default (name, svg) => `var React = require('react'), SVG = ${ svg }

function SVGComponent(props) {

    return SVG;
}

SVGComponent.displayName = 'svg-${ name }';

module.exports = SVGComponent`;
