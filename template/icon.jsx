var React = require('react');

module.exports = React.createClass({
    displayName: 'svg-__NAME__',
    render     : function () {

        var className = 'icon icon-__NAME__';

        if (this.props.className) {

            className += ' ' + this.props.className;
        }

        return <span { ...this.props } className={ className }>__SVG__</span>;
    }
});