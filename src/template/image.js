export default (name, svg) => `var React = require('react'), SVG = ${ svg }

module.exports = React.createClass({
    displayName: 'svg-${ name }',
    render     : function () {

        return SVG;
    }
});`;
