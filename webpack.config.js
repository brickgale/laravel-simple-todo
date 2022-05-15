const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')

const root = path.resolve(__dirname)

require('dotenv').config()
require('core-js')

const rootJS = path.resolve(__dirname, "resources/js")
const rootSASS = path.resolve(__dirname, "resources/sass")

console.log('\n Env: '+process.env.NODE_ENV);
console.log('\n');

module.exports = {
	mode: 'development',
	entry: `${rootJS}/app.js`,
	output: {
		path: `${root}/public/js/`,
		publicPath: `/js/`,
		filename: "app.js"
	},
	module: {
		rules: [
			{
				"test": /\.htm$/,
				use: [ 'html-loader' ]
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				],
			},
			{
				test: /\.sass$/,
				use: [
					'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
				]
			},
			{
				test: /\.vue$/,
				use: [ 'vue-loader' ],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets:[
							[
								root + "/node_modules/@babel/preset-env/lib/index.js",
								{
									useBuiltIns: "entry",
									corejs: "2",
									modules: false,
									forceAllTransforms: true
								}
							]
						],
						plugins:[
							root + "/node_modules/@babel/plugin-syntax-dynamic-import/lib/index.js",
							root + "/node_modules/@babel/plugin-proposal-object-rest-spread/lib/index.js",
							[
								root + "/node_modules/@babel/plugin-transform-runtime/lib/index.js",
								{
									"helpers": false,
									"corejs": 2
								}
							]
						],
					}
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]?[hash]',
						outputPath: 'img',
					}
				}
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				exclude: /node_modules/,
				use: [ 'file-loader?limit=1024&name=fonts/[name].[ext]' ]
			},
			{
				test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				exclude: /node_modules/,
				use: [ 'file-loader?limit=1024&name=fonts/[name].[ext]' ]
			}
		]
	},
	resolve: {
		alias: {
			"@": rootJS,
			"sass": rootSASS,
			"vue": "@vue/runtime-dom",
			'vuex': 'vuex/dist/vuex.esm-bundler'
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
  	devtool: 'source-map',
	plugins: [
		new VueLoaderPlugin(),
	],
	performance: {
		hints: false
	},
	watchOptions: {
		poll: true,
		ignored: /node_modules/
	}
};

if (process.env.NODE_ENV !== 'production') {
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false
		})
	])
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = 'source-map';
	module.exports.mode = 'production';
	module.exports.watch = false;
	module.exports.optimization = {
		minimize: true,
		minimizer: [ new TerserPlugin() ],
		usedExports: true,
	}
}
