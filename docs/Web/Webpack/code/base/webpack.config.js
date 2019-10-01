const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    // JavaScript 入口文件
    entry:"./src/main.js",
    // production  development
    mode:"development",
    output:{
        //把所有的依赖都打包输出到一个 js 文件里面;
        filename:"bundle.min.js",
        //指定文件输出的路径
        path:path.resolve(__dirname,'./dist')
    },
    module:{
        rules:[
            {
                // 用正则去匹配要用该 loader 转换的文件 .css 结尾的
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    //转换 .css 文件需要的 loader
                    use:['css-loader','postcss-loader']
                })
            },{
                test:/\.(png|jpg|jpe?g|gif|svg)(\?.*)?$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:10000
                    }
                }]
            },{
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },{
                test:/\.js$/,
                //过滤掉 node_modules 文件夹, 会让 webpack 编译速度变快
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                        plugins:['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins:[
    	new webpack.ProgressPlugin(),
    	new CleanWebpackPlugin(),
        new ExtractTextPlugin({
            // 提取出来的 .css 文件名
            filename:'css/[name].[hash].css'
        }),
        new HtmlWebpackPlugin({
            //生成 html 后的文件名
            filename:'index.html',
            //选择 index.html 作为模板, 如果不传入 template 选项, webpack 会自动生成一个空的 html 文件
            template:'index.html',
            // 传入的参数为 true 或者是 body 时, 所有打包出来的 js 资源都会被插入到 body 的下面
            inject:true,
            // 生成 html 的 title
            title:'webpack 最佳实践',
        })
    ],
    devtool:'eval-source-map'
}