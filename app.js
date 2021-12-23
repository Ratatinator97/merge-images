import mergeImages from './src/index.js';
import pkg from 'canvas';
import * as fs from 'fs';
const { Canvas, Image} = pkg;

mergeImages(['src/hollydays.jpg'], {
  color: 'white',
	text: "I'm on hollydays",
	fontSize: '36px',
  fontColor: 'red',
  Image: Image,
  Canvas: Canvas

}).then(b64 => {
    const image = b64.replace(/^data:image\/png;base64,/, "");
    fs.writeFile("out.png", image, 'base64', function (err) {
      console.log(err);
    });
  }
  );