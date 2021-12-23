import mergeImages from './src/index.js';
import pkg from 'canvas';
import * as fs from 'fs';
const { Canvas, Image} = pkg;

mergeImages(['src/want.png', 'src/eat.png', 'src/fries.png'], {
  color: 'white',
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  Image: Image,
  Canvas: Canvas

}).then(b64 => {
    const image = b64.replace(/^data:image\/png;base64,/, "");
    fs.writeFile("out.png", image, 'base64', function (err) {
      console.log(err);
    });
  }
  );