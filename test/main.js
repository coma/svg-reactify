var rewire = require('rewire'),
    assert = require('assert'),
    svgrt  = rewire('..');

var svg = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">',
    '   <rect x="0" y="0" width="100" height="100"/>',
    '</svg>'
];

describe('when passing a string', function () {

    it('won\'t do anything if it isn\'t a SVG file', function (done) {

        svgrt.__set__('through', function () {

            assert.strictEqual(arguments.length, 0);
            done();
        });

        svgrt('foo.png');
    });

    it('will work for a SVG file', function (done) {

        var write, end;

        svgrt.__set__('through', function () {

            assert.strictEqual(arguments.length, 2);

            write = arguments[0];
            end   = arguments[1];

            return {
                queue: function (output) {

                    if (!output) {

                        return;
                    }

                    assert.strictEqual(output, 'module.exports = require(\"react\").createClass({render: function () { return (React.createElement(\"svg\", {viewBox: \"0 0 100 100\", xmlns: \"http://www.w3.org/2000/svg\"}, React.createElement(\"path\", {d: \"M0 0h100v100H0z\"}))); }});');
                    done();
                }
            };
        });

        svgrt('foo.svg');
        svg.forEach(write);
        end();
    });
});
