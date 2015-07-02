var React = require('react'),
    SVG   = function (props) {

        return __SVG__;
    };

module.exports = React.createClass({
    displayName: 'svg-__NAME__',
    propTypes  : {
        type: React.PropTypes.oneOf(['svg', 'icon']),
        svg : React.PropTypes.object
    },
    getDefaultProps: function() {

        return {
            type: '__TYPE__',
            svg : {}
        };
    },
    render     : function () {

        switch (this.props.type) {

            case 'svg':
                return SVG(this.props);

            case 'icon':

                var className = 'icon icon-__NAME__';

                if (this.props.className) {

                    className += ' ' + this.props.className;
                }

                return <span { ...this.props } className={ className }>{ SVG(this.props.svg) }</span>;
        }
    }
});