const path = require('path');
module.exports = {
	entry:'./src/main',
	mode:'production',
	output:{
		filename:'bundle.min.js',
		path:path.resolve(__dirname,'dist')
	},
	resolve:{
		extensions:['.ts','.js','.json']
	},
	module:{
		rules:[
			{
				test:/\.ts$/,
				loader:'awesome-typescript-loader'
			}
		]
	},
	devtool:'source-map'
}