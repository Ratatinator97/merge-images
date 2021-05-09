import test from 'ava';
import canvas from "canvas";
const { Canvas, Image } = canvas;
import mergeImages from '../src/index.js';

test('mergeImages is a function', t => {
	t.is(typeof mergeImages, 'function');
});

test('mergeImages returns a Promise', t => {
	t.true(mergeImages([], { Canvas, Image }) instanceof Promise);
});
