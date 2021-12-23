import test from 'ava';
import canvas from 'canvas';
const { Canvas, Image } = canvas;
import mergeImages from '../src/index.js';
import * as fixtures from './fixtures/index.js';

test('mergeImages returns empty b64 string if nothing is passed in', async t => {
	t.plan(1);
	await mergeImages([], { Canvas, Image }).then(b64 => t.true(b64 === 'data:,'));
});

test('mergeImages returns correct data URI', async t => {
	t.plan(1);
	const uris = ['want.png', 'eat.png', 'fries.png'];
	const imagePromises = uris.map(uri => {
		return fixtures.getImage(uri);
	});

	const images = await Promise.all(imagePromises);

	const b64 = await mergeImages(images, {
		Canvas,
		Image,
		color: 'white',
		text: "this is a test, testing is important. Yes it can sometimes be quite boring to make them but you thank yourself later",
		fontSize: '36px',
		fontType: 'Serif',
		fontColor: 'black',
		Xpadding : null, // padding used to place text with Xpadding pixels after the left edge
		YpaddingLines : 0, // padding of pixels in between lines
		Ypadding : 0, 
	});

	const expectedB64 = await fixtures.getDataURI('result1.png');

	t.true(b64.trim() === expectedB64.trim());
});

test('mergeImages returns correct data URI2', async t => {
	t.plan(1);
	const uris = ['want.png', 'eat.png', 'fries.png'];
	const imagePromises = uris.map(uri => {
		return fixtures.getImage(uri);
	});

	const images = await Promise.all(imagePromises);
	const b64 = await mergeImages(images, {
		Canvas,
		Image,
		color: 'black',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		fontSize: '24px',
		fontType: 'Helvetica',
		fontColor: 'white',
		Xpadding : null, // padding used to place text with Xpadding pixels after the left edge
		YpaddingLines : 0, // padding of pixels in between lines
		Ypadding : 20, 
	});

	const expectedB64 = await fixtures.getDataURI('result2.png');

	t.true(b64.trim() === expectedB64.trim());
});

test('mergeImages returns correct data URI3', async t => {
	t.plan(1);
	const uris = ['hollydays.jpg'];
	const imagePromises = uris.map(uri => {
		return fixtures.getImage(uri);
	});

	const images = await Promise.all(imagePromises);
	const b64 = await mergeImages(images, {
		Canvas,
		Image,
		color: 'white',
		text: "I'm on hollydays",
		fontSize: '36px',
		fontColor: 'red',
	});

	const expectedB64 = await fixtures.getDataURI('result3.png');

	t.true(b64.trim() === expectedB64.trim());
});
