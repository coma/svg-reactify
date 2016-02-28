import { basename }           from 'path';
import { transform as babel } from 'babel-core';
import react                  from 'babel-preset-react';
import SVGO                   from 'svgo';
import through                from 'through2';
import camelCase              from 'lodash.camelcase';
import kebabCase              from 'lodash.kebabcase';
import template               from './template';

const SVG_REGEX  = /\.svg$/i,
      ATTR_REGEX = /(class|clip-path|fill-opacity|font-family|font-size|marker-end|marker-mid|marker-start|stop-color|stop-opacity|stroke-width|stroke-linecap|stroke-dasharray|stroke-opacity|text-anchor)=/g;

const svgo = new SVGO({
    plugins: [
        {removeViewBox: false},
        {removeUselessStrokeAndFill: false}
    ]
});

const babelOptions = {
    presets: [react]
};

function camelizeAttrs (code) {

    return code.replace(ATTR_REGEX, (line, attr) => {

        return attr !== 'class' ? camelCase(attr) + '=' : 'className='
    });
}

function transform (code) {

    return babel(camelizeAttrs(code), babelOptions).code;
}

function createTransformer (filename, template) {

    const name = kebabCase(basename(filename, '.svg'));
    
    let buffer = '';

    function handleStream (chunk, encoding, next) {

        buffer += chunk.toString();
        next();
    }

    function finishStream (next) {

        svgo.optimize(buffer, svg => {

            this.push(template(name, transform(svg.data)));
            next();
        });
    }

    return through(handleStream, finishStream);
}

export default (filename, options = {}) => {

    if (!SVG_REGEX.test(filename)) {

        return through();
    }

    const type = Object
        .keys(template)
        .find(t => options[t] && (new RegExp(options[t])).test(filename));

    return  createTransformer(filename, template[type || options.default || 'icon']);
};
