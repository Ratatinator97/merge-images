import * as mergeimages from './src/index.js';
import pkg from 'canvas';
const { Canvas, Image} = pkg;


mergeimages.default(['/want.png', '/eat.png', '/fries.png'], {
  color: 'white',
	text: 'Hello text'
})
  .then(b64 => document.querySelector('img').src = b64);