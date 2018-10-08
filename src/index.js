import { basename }           from 'path';
import { transform as babel } from 'babel-core';
import react                  from 'babel-preset-react';
import SVGO                   from 'svgo';
import through                from 'through2';
import camelCase              from 'lodash.camelcase';
import kebabCase              from 'lodash.kebabcase';
import template               from './template';

const SVG_REGEX  = /\.svg$/i;
const SVG_ATTRS = [
    'accent-height',
    'alignment-baseline',
    'arabic-form',
    'baseline-shift',
    'cap-height',
    'clip-path',
    'clip-rule',
    'color-interpolation',
    'color-interpolation-filters',
    'color-profile',
    'color-rendering',
    'dominant-baseline',
    'enable-background',
    'fill-opacity',
    'fill-rule',
    'flood-color',
    'flood-opacity',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-weight',
    'glyph-name',
    'glyph-orientation-horizontal',
    'glyph-orientation-vertical',
    'horiz-adv-x',
    'horiz-origin-x',
    'image-rendering',
    'letter-spacing',
    'lighting-color',
    'marker-end',
    'marker-mid',
    'marker-start',
    'overline-position',
    'overline-thickness',
    'paint-order',
    'panose-1',
    'pointer-events',
    'rendering-intent',
    'shape-rendering',
    'stop-color',
    'stop-opacity',
    'strikethrough-position',
    'strikethrough-thickness',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
    'text-anchor',
    'text-decoration',
    'text-rendering',
    'underline-position',
    'underline-thickness',
    'unicode-bidi',
    'unicode-range',
    'units-per-em',
    'v-alphabetic',
    'v-hanging',
    'v-ideographic',
    'v-mathematical',
    'vector-effect',
    'vert-adv-y',
    'vert-origin-x',
    'vert-origin-y',
    'word-spacing',
    'writing-mode',
    'x-height'
];
const ATTR_REGEX = new RegExp(`(class|${SVG_ATTRS.join('|')})=`, 'g');

const svgo = new SVGO({
    plugins: [
        {convertStyleToAttrs: true},
        {removeAttrs: {attrs: 'style'}},
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

module.exports = (filename, options = {}) => {

    if (!SVG_REGEX.test(filename)) {

        return through();
    }

    const type = Object
        .keys(template)
        .find(t => options[t] && (new RegExp(options[t])).test(filename));

    return  createTransformer(filename, template[type || options.default || 'icon']);
};
