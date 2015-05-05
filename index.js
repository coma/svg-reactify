var through = require('through'),
    SVGO    = require('svgo'),
    react   = require('react-tools');

var isSVG = function (filename) {

    return (/\.svg$/i).test(filename);
};

var svgo = new SVGO();

module.exports = function (filename) {

    var write = function (buffer) {

        data += buffer;
    };

    var end = function () {

        svgo.optimize(data, out);
    };

    var out = function (svg) {

        var source = "var React = require('react');module.exports = React.createClass({render: function () { return (" + svg.data + "); }});",
            output = react.transform(source, {
                es5           : true,
                sourceMap     : false,
                sourceFilename: filename,
                stripTypes    : false,
                harmony       : false
            });

        stream.queue(output);
        stream.queue(null);
    };

    var data   = '',
        stream = isSVG(filename) ? through(write, end) : through();

    return stream;
};
