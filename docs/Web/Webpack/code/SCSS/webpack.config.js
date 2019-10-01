const path = require('path');
module.exports = {
	entry:'./src/main.js',
	mode:'production',
	output:{
		filename:'bundle.min.js',
		path:path.resolve(__dirname,'dist')
	},
	module:{
		rules:[
			{
				test:/\.scss$/,
				// SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
				use:['style-loader','css-loader','sass-loader']
			}
		]
	},
	devtool:'source-map'
}