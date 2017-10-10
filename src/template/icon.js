export default (name, svg) => `var React = require('react'), SVG = ${ svg }

const icon = (props) => {
  console.log(props);
  return React.createElement('span', props, SVG); 
};

icon.displayName = 'svg-${ name }';

icon.defaultProps = {
  className: 'icon icon-${ name }'
};

module.exports = icon;`;
