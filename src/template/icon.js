export default (name, svg) => `var React = require('react'), SVG = ${ svg }

function SVGComponent (props) {

    return React.createElement('span', props, SVG);
};

SVGComponent.displayName = 'svg-${ name }',
SVGComponent.defaultProps = {
    className: 'icon icon-${ name }'
}

module.exports = SVGComponent;`
