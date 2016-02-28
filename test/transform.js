import fs           from 'fs';
import { join }     from 'path';
import svgr         from '../src';
import { Writable } from 'stream';

const file = join(__dirname, 'some.svg');

export default (options, end) => {

	let buffer = '';

	const transform = svgr(file, options);

	const sink = new Writable({
	    write: function (chunk, encoding, next) {

	        buffer += chunk.toString();
	        next();
	    }
	});

	sink.on('finish', () => {

		const m = new module.constructor();
        m.paths = module.paths;
        m._compile(buffer, 'some.js');
		end(m.exports);
	});

	fs
	    .createReadStream(file)
	    .pipe(transform)
	    .pipe(sink);
};
