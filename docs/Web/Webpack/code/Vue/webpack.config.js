const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

module.exports = {
	entry:'./src/main.ts',
	mode:'production',
	output:{
		filename:'bundle.min.js',
		path:path.resolve(__dirname,'dist')
	},
	resolve:{
		alias:{
			'@':path.resolve(__dirname,'src')
		},
		// 增加对 TypeScript 的 .ts 和 .vue 文件的支持
		extensions:['.ts','.vue','.js','.json']
	},
	module:{
		rules:[
			{
				test:/\.ts$/,
				loader:'ts-loader',
				exclude:/node_modules/,
				options:{
					// 让 tsc 把 vue 文件当成一个 TypeScript 模块去处理，以解决 moudle not found 的问题，tsc 本身不会处理 .vue 结尾的文件
					appendTsSuffixTo:[/\.vue$/]
				}
			},{
				test:/\.vue$/,
				use:['vue-loader']
			},{
				test:/\.scss$/,
				// SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
				use:['style-loader','css-loader','sass-loader']
			}
		]
	},
	plugins:[
		new VueLoaderPlugin(),
		new webpack.ProgressPlugin(),
	],
	devtool:'source-map'
}