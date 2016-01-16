var through = require('through'),
    fs      = require('fs'),
    path    = require('path'),
    extend  = require('extend'),
    SVGO    = require('svgo'),
    babel   = require('babel'),
    _s      = require('underscore.string'),
    svgo    = new SVGO();

var templates = ['all', 'svg', 'icon'],
    types     = ['svg', 'icon'];

var settings = {
    babel: {},
    svgo : {
        plugins: [
            {
                removeViewBox: false
            }, {
                removeUselessStrokeAndFill: false
            }
        ]
    }
};

var isSVG = function (filename) {

    return (/\.svg$/i).test(filename);
};

var getTemplate = function (type) {

    return fs.readFileSync(path.join(__dirname, 'template', type + '.jsx'), {
        encoding: 'utf8'
    });
};

var type     = 'svg',
    template = getTemplate('svg'),
    render   = function (filename, data) {

    var name = _s.slugify(path.basename(filename, '.svg'));

    return template
        .replace('__TYPE__', type)
        .replace(/__NAME__/g, name)
        .replace('__SVG__', data.replace('<svg', '<svg {...props}'));
};

var transform = function (filename) {

    var write = function (buffer) {
        data += buffer;
    };

    var end = function () {
        svgo.optimize(data, out);
    };

    var out = function (svg) {

        var source = render(filename, svg.data),
            output = babel.transform(source, settings.babel);

        var replaceAttribute = function (a, str) {
          return str.replace(/-(.)/g, function (_, letter) {
            return letter.toUpperCase();
          });
        };

        output.code = output.code.replace(/\"(clip-path|fill-opacity|font-family|font-size|marker-end|marker-mid|marker-start|stop-color|stop-opacity|stroke-width|stroke-linecap|stroke-dasharray|stroke-opacity|text-anchor)\"/g, replaceAttribute);

        stream.queue(output.code);
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

    extend(settings.babel, a.babel);
    extend(settings.svgo, a.svgo);

    svgo = new SVGO(settings.svgo);

    if (a.template) {

        if (templates.indexOf(a.template) < 0) {

            throw new Error('Template "' + a.template + '" not found...');
        }

        template = getTemplate(a.template);

        if (a.template === 'all' && a.type) {

            if (types.indexOf(a.type) < 0) {

                throw new Error('Type "' + a.type + '" not found...');
            }

            type = a.type;
        }
    }

    return transform;
};
