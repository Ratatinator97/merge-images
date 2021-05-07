import test from 'ava';
import { Canvas, Image } from 'canvas';
import mergeImages from '../';
import fixtures from './fixtures';

test('mergeImages returns empty b64 string if nothing is passed in', async t => {
	t.plan(1);
	await mergeImages([], { Canvas, Image }).then(b64 => t.true(b64 === 'data:,'));
});

test('mergeImages returns correct data URI', async t => {
	t.plan(1);
	const uris = ['want.png', 'eat.png', 'fries.png'];
	let imagePromises = uris.map((uri) => {
		return fixtures.getImage(uri)
	});

	let images = await Promise.all(imagePromises);

	const b64 = await mergeImages(images, {
		Canvas: Canvas,
		Image: Image,
		crossOrigin: 'Anonymous',
		color: 'white',
		text: 'Hello text'
	});

	const expectedB64 = await fixtures.getDataURI('result.png');

	t.true(b64 === expectedB64);
});

test('mergeImages returns correct data URI2', async t => {
	t.plan(1);
	const uris = ['want.png', 'eat.png', 'fries.png'];
	let imagePromises = uris.map((uri) => {
		return fixtures.getImage(uri)
	});

	let images = await Promise.all(imagePromises);

	const b64 = await mergeImages(images, {
		Canvas: Canvas,
		Image: Image,
		crossOrigin: 'Anonymous',
		color: 'white',
		fontColor: 'red',
		fontSize: '50px',
		fontType: 'Montserrat',
		text: 'Hello text'
	});

	const expectedB64 = await fixtures.getDataURI('result2.png');

	t.true(b64 === expectedB64);
});