export default (name, svg) => `var React = require('react'), SVG = ${ svg }

const image = () => {
  return SVG;
};

image.displayName = 'svg-${ name }';

module.exports = image;`;
