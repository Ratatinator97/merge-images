# merge-images-horizontally-with-text

> Easily compose images horizontally and add customizable text

[![Build Status](https://github.com/Ratatinator97/merge-images/actions/workflows/node.js.yml/badge.svg)](https://github.com/Ratatinator97/merge-images/actions/workflows/node.js.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/Ratatinator97/merge-images/badge.svg?branch=master)](https://coveralls.io/github/lukechilds/merge-images?branch=master)
[![npm](https://img.shields.io/npm/dm/merge-images-horizontally-with-text.svg)](https://www.npmjs.com/package/merge-images-horizontally-with-text)
[![npm](https://img.shields.io/npm/v/merge-images-horizontally-with-text.svg)](https://www.npmjs.com/package/merge-images-horizontally-with-text)

Fork of the original [merge-images](https://github.com/lukechilds/merge-images).

This version allows to arrange images only horizontally. You can also add text and a colored background.
The function returns a Promise which resolves to a base64 data URI. Supports both the browser and Node.js.

## Install

```shell
npm install --save merge-images-horizontally-with-text
```

## Usage

With the following images:

`/want.png`|`/eat.png`|`/fries.png`
---|---|---
<img src="/test/fixtures/want.png" width="128">|<img src="/test/fixtures/eat.png" width="128">|<img src="/test/fixtures/fries.png" width="128">

You can do:

```js
import mergeImages from 'merge-images-horizontally-with-text';

mergeImages(['/want.png', '/eat.png', '/fries.png'], {
  color: 'white',
	text: 'Hello text'
})
  .then(b64 => document.querySelector('img').src = b64);
  // data:image/png;base64,iVBORw0KGgoAA...
```

And that would update the `img` element to show this image:

<img src="/test/fixtures/result.png" width="512">

### Text font and color

Those source png images were already the right dimensions to be overlaid on top of each other. You can also supply an array of objects with x/y co-ords to manually position each image:

```js
import mergeImages from 'merge-images-horizontally-with-text';

mergeImages(['/want.png', '/eat.png', '/fries.png'], {
  color: 'white',
  fontColor: 'red',
  fontSize: '50px',
  fontType: 'Montserrat',
  text: 'Hello text'
})
  .then(b64 => document.querySelector('img').src = b64);
  // data:image/png;base64,iVBORw0KGgoAA...
```

Using the same source images as above would output this:

<img src="/test/fixtures/result2.png" width="512">

### Opacity

The opacity can also be tweaked on each image.

```js
mergeImages([
  { src: 'want.png' },
  { src: 'eat.png', opacity: 0.7 },
  { src: 'fries.png', opacity: 0.3 }
])
  .then(b64 => ...);
  // data:image/png;base64,iVBORw0KGgoAA...
```

## Node.js Usage

Usage in Node.js is the same, however you'll need to also require [node-canvas](https://github.com/Automattic/node-canvas) and pass it in via the options object.

```js
import mergeImages from 'merge-images-horizontally-with-text';
const { Canvas, Image } = require('canvas');

mergeImages(['/want.png', '/eat.png', '/fries.png'], {
  color: 'white',
	text: 'Hello text'
})
  .then(b64 => document.querySelector('img').src = b64);
  // data:image/png;base64,iVBORw0KGgoAA...
```
One thing to note is that you need to provide a valid image source for the node-canvas `Image` rather than a DOM `Image`. Notice the above example uses a file path, not a relative URL like the other examples. Check the [node-canvas docs](https://github.com/Automattic/node-canvas) for more information on valid `Image` sources.

## API

### mergeImages(images, [options])

Returns a Promise which resolves to a base64 data URI

#### images

Type: `array`<br>
Default: `[]`

Array of valid image sources for `new Image()`.<br>

#### options

Type: `object`

##### options.format

Type: `string`<br>
Default: `'image/png'`

A DOMString indicating the image format.

##### options.quality

Type: `number`<br>
Default: `0.92`

A number between 0 and 1 indicating image quality if the requested format is image/jpeg or image/webp.

##### options.Canvas

Type: `Canvas`<br>
Default: `undefined`

Canvas implementation to be used to allow usage outside of the browser. e.g Node.js with node-canvas.

##### options.crossOrigin

Type: `string`<br>
Default: `undefined`

The `crossOrigin` attribute that `Image` instances should use. e.g `Anonymous` to [support CORS-enabled images](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image).

##### options.color

Type `CSS Color` <br>
default: `white`

The `color` background that  the final image will have.
##### options.text

Type `string` <br>
Default: `undefined`

The text that will be written in the final image.

##### options.fontSize

Type `string` <br>
Default: `50px`

The fontsize of the text.

##### options.fontType

Type `string` <br>
Default: `Montserrat`

The font used to write the text.

##### options.fontColor

Type `CSS Color` <br>
Default: `black`

The color for the text.

## License

MIT © Luke Childs + Alexandros SIDIRAS
