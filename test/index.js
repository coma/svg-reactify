import transform     from './transform';
import { shallow }   from 'enzyme';
import { configure } from 'enzyme';
import Adapter       from 'enzyme-adapter-react-15';
import React         from 'react';
import test          from 'tape';

configure({ adapter: new Adapter() });

test('using the default options', t => {

	t.plan(12);

	transform({}, SVG => {

		const c = shallow(<SVG />);

    	t.ok(c.is('span'), 'the root is an span');
    	t.ok(c.hasClass('icon'), 'the root has the icon class');
    	t.ok(c.hasClass('icon-some'), 'the root has the kebab file name class');
    	t.equals(c.children().length, 1, 'it has only one child');
    	t.ok(c.children('svg').length, 'the child is an svg');
    	t.equals(c.children('svg').prop('viewBox'), '0 0 100 100', 'the svg has a viewBox attribute');
    	t.equals(c.children('svg').children().length, 1, 'the svg has only one child');
    	t.ok(c.find('path').length, 'it has a path element');
    	t.ok(c.find('path').hasClass('someclass'), 'the path has a class');
    	t.equals(c.find('path').prop('d'), 'M0 0h100v100H0z', 'the path has a d attribute');
    	t.equals(c.find('path').prop('strokeWidth'), '2.5', 'the path has an stroke-width attribute');
    	t.equals(c.find('path').prop('clipPath'), 'something', 'the path has an clip-path attribute');
	});
});

test('using the default option', t => {

	t.plan(7);

	transform({default: 'image'}, SVG => {

		const c = shallow(<SVG />);
    
    	t.ok(c.is('svg'), 'the root is an svg');
    	t.equals(c.prop('viewBox'), '0 0 100 100', 'the svg has a viewBox attribute');
    	t.equals(c.children().length, 1, 'it has only one child');
    	t.ok(c.find('path').hasClass('someclass'), 'the path has a class');
    	t.equals(c.find('path').prop('d'), 'M0 0h100v100H0z', 'the path has a d attribute');
    	t.equals(c.find('path').prop('strokeWidth'), '2.5', 'the path has an stroke-width attribute');
    	t.equals(c.find('path').prop('clipPath'), 'something', 'the path has an clip-path attribute');
	});
});

test('matching the filename', t => {

	t.plan(6);

	transform({image: 'some'}, SVG => t.ok(shallow(<SVG />).is('svg'), 'the root is an svg'));
	transform({icon: 'some'}, SVG => t.ok(shallow(<SVG />).is('span'), 'the root is an span'));

	transform({image: 'somex', default: 'image'}, SVG => t.ok(shallow(<SVG />).is('svg'), 'the root is an svg'));
	transform({icon: 'somex', default: 'icon'}, SVG => t.ok(shallow(<SVG />).is('span'), 'the root is an span'));

	transform({image: 'some', default: 'icon'}, SVG => t.ok(shallow(<SVG />).is('svg'), 'the root is an svg'));
	transform({icon: 'some', default: 'image'}, SVG => t.ok(shallow(<SVG />).is('span'), 'the root is an span'));
});