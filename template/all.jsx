var React = require('react'),
    SVG   = __SVG__;

module.exports = React.createClass({
    displayName: 'svg-__NAME__',
    propTypes  : {
        type: React.PropTypes.oneOf(['svg', 'icon'])
    },
    getDefaultProps: function() {

        return {
            type: '__TYPE__'
        };
    },
    render     : function () {

        switch (this.props.type) {

            case 'svg':
                return SVG;

            case 'icon':

                var className = 'icon icon-__NAME__';

                if (this.props.className) {

                    className += ' ' + this.props.className;
                }

                return <span { ...this.props } className={ className }>{ SVG }</span>;
        }
    }
});