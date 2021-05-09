import buble from '@rollup/plugin-buble';

const pkg = require('./package.json');

export default {
	input: 'src/index.js',
	plugins: [
		buble()
	],
	output: [
		{
			file: pkg.main,
			format: 'umd',
			name: pkg.name,
			sourcemap: true
		},
		{
			file: pkg.module,
			format: 'es',
			sourcemap: true
		}
	]
};
