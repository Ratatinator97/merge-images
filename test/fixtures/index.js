import { readFile } from 'fs';
import pify from 'pify'
import path from 'path';
import DataURIParser from 'datauri/parser.js';
const __dirname = path.dirname(new URL(import.meta.url).pathname);


export function getImage(image) {
  return pify(readFile)(`${__dirname}/${image}`);
};

export function getDataURI(image) {
  const datauri = new DataURIParser();
  const ext = image.substring(image.lastIndexOf('.'));
  return getImage(image).then(buffer => datauri.format(ext, buffer).content);
}

