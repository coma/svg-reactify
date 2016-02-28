export default (name, svg) => `var React = require('react'), SVG = ${ svg }

module.exports = React.createClass({
    displayName: 'svg-${ name }',
    getDefaultProps: function () {

        return {
            className: 'icon icon-${ name }'
        };
    },
    render: function () {

        return React.createElement('span', this.props, SVG);
    }
});`;
