var React = require('react'),
    SVG   = function (props) {

        return __SVG__;
    };

module.exports = React.createClass({
    displayName: 'svg-__NAME__',
    propTypes  : {
        svg: React.PropTypes.object
    },
    getDefaultProps: function() {

        return {
            svg: {}
        };
    },
    render     : function () {

        var className = 'icon icon-__NAME__';

        if (this.props.className) {

            className += ' ' + this.props.className;
        }

        return <span { ...this.props } className={ className }>{ SVG(this.props.svg) }</span>;
    }
});