const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { WebPlugin } = require('web-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
	entry:'./src/main.ts',
	mode:'production',
	output:{
		filename:'[name].[hash].js',
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
				use:ExtractTextPlugin.extract({
					fallback:'style-loader',
					use:['css-loader','sass-loader']
				})
			}
		]
	},
	plugins:[
		new VueLoaderPlugin(),
		new webpack.ProgressPlugin(),
		new WebPlugin({
			// 模板选择为当前目录下的  index.html
			template:'./index.html',
			// 输出的文件名为  index.html
			filename:'index.html'
		}),
		new ExtractTextPlugin({
			// 给输出的 CSS 文件名称加上 Hash 值
			filename:'[name].[hash].css'
		}),
		new webpack.DefinePlugin({
			// 定义 NODE_ENV 环境变量为 production，以去除源码中只有开发时才需要的部分
			'process.env':{
				NODE_ENV:JSON.stringify('production')
			}
		})
	],
	// 压缩输出的 JavaScript 代码
	optimization:{
		minimizer:[
			new UglifyJsPlugin()
		]
	},
	devtool:'source-map'
}