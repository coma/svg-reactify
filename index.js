var through = require('through'),
    path    = require('path'),
    extend  = require('extend'),
    SVGO    = require('svgo'),
    react   = require('react-tools'),
    svgo    = new SVGO();

var settings = {
    react: {
        es5       : true,
        sourceMap : false,
        stripTypes: false,
        harmony   : false
    },
    svgo : {}
};

var isSVG = function (filename) {

    return (/\.svg$/i).test(filename);
};

var wrapScript = function (filename, data) {

    return 'module.exports = require("react").createClass({render: function () { return (' + data + '); }});';
};

var wrapSpan = function (filename, data) {

    return wrapScript(filename, '<span class="icon icon-' + path.basename(filename, '.svg') + '">' + data + '</span>');
};

var wrap = wrapScript;

var transform = function (filename) {

    var write = function (buffer) {

        data += buffer;
    };

    var end = function () {

        svgo.optimize(data, out);
    };

    var out = function (svg) {

        var source = wrap(filename, svg.data),
            output = react.transform(source, settings.react);

        stream.queue(output);
        stream.queue(null);
    };

    var data   = '',
        stream = isSVG(filename) ? through(write, end) : through();

    return stream;
};

module.exports = function (a) {

    if (typeof a === 'string' || a instanceof String) {

        return transform(a);
    }

    extend(settings.react, a.react);
    extend(settings.svgo, a.svgo);

    svgo = new SVGO(settings.svgo);

    if (a.icon) {

        wrap = wrapSpan;
    }

    return transform;
};
