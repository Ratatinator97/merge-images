import test from 'ava';
import canvas from "canvas";
const { Canvas, Image } = canvas;
import mergeImages from '../src/index.js';

test('mergeImages rejects Promise if node-canvas instance isn\'t passed in', async t => {
	t.plan(1);
	await t.throwsAsync(() => mergeImages([]));
});

test('mergeImages rejects Promise if image load errors', async t => {
	t.plan(1);
	await t.throwsAsync(() => mergeImages(['nothing-here.jpg'], { Canvas, Image }));
});
