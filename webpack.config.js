const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReplaceHashInFileWebpackPlugin = require('replace-hash-in-file-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ExtensionReloader  = require('webpack-extension-reloader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebExtWebpackPlugin = require('@ianwalter/web-ext-webpack-plugin');
const ChunksWebpackPlugin = require('chunks-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

function generateHtmlPlugins(items) {
    return items.map((name) => new HtmlWebpackPlugin(
      {
        filename: `./${name}.html`,
        chunks: [ name ],
      }
    ))
  }

function checkEnvToBuildFFExt(mode) {
    return mode != 'development' ? [new WebExtWebpackPlugin({ 
        sourceDir: './dist'
     })] : []
}

const PAGES_PATH = './src/pages'
const mode = process.env.NODE_ENV;

module.exports = (env, argv) =>{
    return  {
    mode,
    entry: {
        'configure-webpack': './configure-webpack.js',
        'babel-polyfill': 'babel-polyfill',
        'background': `${PAGES_PATH}/background/background.js`,
        'popup': `${PAGES_PATH}/popup/popup.js`,
        'options': `${PAGES_PATH}/options/options.js`
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name]',
        libraryTarget: "umd"
    },
    devtool: '',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    // optimization: {
	// 	splitChunks: {
    //         chunks: 'all'
	// 		// cacheGroups: {
	// 		// 	commons: {
	// 		// 		test: /[\\/]node_modules[\\/]/,
	// 		// 		name: 'vendors',
	// 		// 		chunks: 'all'
	// 		// 	}
	// 		// }
	// 	}
	// },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { 
                        loader: 'css-loader',
                        // options: {
                        //     modules: {
                        //         localIdentName: "[name]__[local]___[hash:base64:5]",
                        //     },														
                        //     sourceMap: true
                        // }
                     },
                     { 
                         loader: 'postcss-loader',
                         options: {
                             ident: 'postcss',
                             plugins: () => [
                                 autoprefixer({})
                             ]
                         }
                      }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
        new ChunksWebpackPlugin(),
        new BrotliPlugin({
			asset: '[path].br[query]',
			test: /\.(js|css|html|svg)$/,
			threshold: 10240,
			minRatio: 0.8
		}),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new ExtensionReloader({
            entries: {
                background: 'background',
                extensionPage: ['popup', 'options']
              }
        }),
        ...generateHtmlPlugins(
            [
              'background',
              'popup',
              'options'
            ]
        ),
        new CopyPlugin([
            { 
                from: 'src',
                to: path.resolve('dist'),
                ignore: [ 'pages/**/*', 'modules/**/*', 'shared/**/*', '.DS_Store' ]
            }
        ]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '30-50'
            }
        }),
        ...checkEnvToBuildFFExt(mode)
    ]
};
}