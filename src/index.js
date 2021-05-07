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
	fontColor: 'black'
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
			let x_value_of_image = 0;

			// Determine the height of the canvas
			// Determine the x coordinate of every image
			for (var i = 0; i < images.length; i++) {
				images[i] = Object.assign(images[i], { x: x_value_of_image, y: 0 });
				if (images[i].img.height >= maxheight) {
					maxheight = images[i].img.height;
				}
				x_value_of_image += images[i].img.width;
			}
			// Set canvas dimensions
			canvas.width = x_value_of_image;
			canvas.height = maxheight;

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

			// Write text to the bottom of the canvas
			if (options.text) {
				ctx.fillStyle = options.fontColor;
				ctx.textBaseline = 'bottom';
				ctx.font = options.fontSize + ' \'' + options.fontType + '\'';
				ctx.fillText(options.text, 50, (canvas.height) * (9 / 10));
			}

			if (options.Canvas && options.format === 'image/jpeg') {
				// Resolve data URI for node-canvas jpeg async
				return new Promise((resolve, reject) => {
					canvas.toDataURL(options.format, {
						quality: options.quality,
						progressive: false
					}, (err, jpeg) => {
						if (err) {
							reject(err);
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

export default mergeImages;

/*
const { Canvas, Image } = require('canvas');
const fs = require("fs");
let urls = ["../test/fixtures/want.png", "../test/fixtures/eat.png", "../test/fixtures/fries.png"];
mergeImages(urls, {
	Canvas: Canvas,
	Image: Image,
	crossOrigin: 'Anonymous',
	color: 'white',
	fontColor: 'red',
	fontSize: '50px',
	fontType: 'Montserrat',
	text: 'Hello text'
})
	.then(b64 => {
		var base64Data = b64.replace(/^data:image\/png;base64,/, "");
		fs.writeFile("out.png", base64Data, 'base64', function (err) {
			console.log(err);
		});
	}); */