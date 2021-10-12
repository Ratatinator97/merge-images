const { Canvas, Image } = require('canvas');

// Defaults
const defaultOptions = {
  format: 'image/png',
  quality: 0.92,
  Canvas: undefined,
  crossOrigin: undefined,
  color: undefined,
  text: undefined,
  fontSize: '36px',
  fontType: 'Serif',
  fontColor: 'black',
  Xpadding : 50, // padding used to place text with Xpadding pixels after the left edge
  YpaddingLines : 40, // padding of pixels in between lines
  Ypadding : 40, // pixels of padding in between the images and the lines
};
// Return Promise
const mergeImages = (sources = [], options = {}) => new Promise(resolve => {
  options = Object.assign({}, defaultOptions, options);

  // Setup browser/Node.js specific variables
  const canvas = options.Canvas ? new options.Canvas() : window.document.createElement('canvas');
  const Image = options.Image || window.Image;
  // Load sources
  const images = sources.map(source => new Promise((resolve, reject) => {
    // Convert sources to objects
    if (source.constructor.name !== 'Object') {
      source = { src: source };
    }

    // Resolve source and img when loaded
    const img = new Image();
    img.crossOrigin = options.crossOrigin;
    img.onerror = () => reject(new Error('Couldn\'t load image'));
    img.onload = () => resolve(Object.assign({}, source, { img }));
    img.src = source.src;
  }));

  // Get canvas context
  const ctx = canvas.getContext('2d');

  // When sources have loaded
  resolve(Promise.all(images)
    .then(images => {
      let maxheight = 0;
      let xValueOfImage = 0;

      // Determine the height of the canvas
      // Determine the x coordinate of every image
      for (let i = 0; i < images.length; i++) {
        images[i] = Object.assign(images[i], { x: xValueOfImage, y: 0 });
        if (images[i].img.height >= maxheight) {
          maxheight = images[i].img.height;
        }
        xValueOfImage += images[i].img.width; // add pixels in between each image
      }

      // Set canvas dimensions 

      canvas.width = xValueOfImage;
      let nbrLines = 1;
      if (options.text) {
        ctx.fillStyle = options.fontColor;
        ctx.textBaseline = 'bottom';
        ctx.font = options.fontSize + ' \'' + options.fontType + '\'';
        const textlength= ctx.measureText(options.text).width;
        nbrLines= Math.floor(textlength/xValueOfImage)+1;
      }
      canvas.height = maxheight+(nbrLines * options.YpaddingLines) + options.Ypadding;

      // Fill the background of the canvas with color
      if (options.color) {
        ctx.fillStyle = options.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw images to canvas
      images.forEach(image => {
        ctx.globalAlpha = image.opacity ? image.opacity : 1;
        return ctx.drawImage(image.img, image.x || 0, image.y || 0);
      });

      fillTextWordWrapping(ctx, options.text, options.Xpadding, maxheight + options.Ypadding, options.YpaddingLines ,xValueOfImage-options.Xpadding, options);

      if (options.Canvas && options.format === 'image/jpeg') {
        // Resolve data URI for node-canvas jpeg async
        return new Promise((resolve, reject) => {
          canvas.toDataURL(options.format, {
            quality: options.quality,
            progressive: false
          }, (error, jpeg) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(jpeg);
          });
        });
      }

      // Resolve all other data URIs sync
      return canvas.toDataURL(options.format, options.quality);
    }));
});

mergeImages(['./want.png', './eat.png', './fries.png'], {
  color: 'white',
  text: 'Hello text this text is probably too long and will get cut that is why i need to brake it into a second line so as to see the entire pictogram and the text now it is too long',
  Image: Image,
  Canvas: Canvas

})
  .then(b64 => {
    const image = b64.replace(/^data:image\/png;base64,/, "");
    fs.writeFile("out.png", image, 'base64', function (err) {
      console.log(err);
    });
  }
  );

//Slightly modified version of Stack Overflow user Gabriele Petrioli
//code found at http://jsfiddle.net/BaG4J/5/

function fillTextWordWrapping( context , text, x, y, lineHeight, fitWidth, options)
{
    context.fillStyle = options.fontColor;
    context.textBaseline = 'bottom';
    context.font = options.fontSize + ' \'' + options.fontType + '\'';
    fitWidth = fitWidth || 0;
    if (fitWidth <= 0) // if fitWidth undifined or ==0
    {
        context.fillText( text, x, y );
        return;
    }
    var words = text.split(' '); // split all words
    var currentLine = 0;
    var idx = 1;
    while (words.length > 0 && idx <= words.length) // enter while loop that runs until it has filled all the words in text
    {
        var str = words.slice(0,idx).join(' '); // here we measure the size in pixels of the idx first words 
        var w = context.measureText(str).width; // and we continue untill the size is supperior to the fitWidth
        if ( w > fitWidth ) // if it's supperior we fill text and remove the idx first words from our word list 
        {
            if (idx==1)
            {
                idx=2;
            }
            context.fillText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) );
            currentLine++;
            words = words.splice(idx-1);
            idx = 1; // restart at 1, restart a line
        }
        else
        {idx++;}
    }
    // at the end of while loop, we fill the remaining words that are not big enough to fill a line in a new line 
    if  (idx > 0)
        context.fillText( words.join(' '), x, y + (lineHeight*currentLine));
}

export default mergeImages;