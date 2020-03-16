const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReplaceHashInFileWebpackPlugin = require('replace-hash-in-file-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = (env, argv) =>{
    return  {
    watch:  argv.mode != 'production',
    entry: {
        'background': './src/background.js',
        'popup': './src/popup/js/popup.js',
        'options': './src/options/js/options.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash].js',
        chunkFilename: '[name]'
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { 
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            },														
                            sourceMap: true
                        }
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
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=10000&name=img/[name].[ext]'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: './popup.html',
            inject: 'body',
            chunks: ['popup']
        }),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: './options.html',
            inject: 'body',
            chunks: ['options']
        }),
        new CopyPlugin([
            { from: './manifest.json' },
            { from: './config.json' },
            { from: './src/assets/icon', to: './icons'}
        ]),
        new ReplaceHashInFileWebpackPlugin([{
            dir: 'dist',
            files: ['manifest.json'],
            rules: [{
                search: /%%background%%/,
                replace: 'js/background.[hash].js'
            },
            {
                search: /%%options%%/,
                replace: 'js/options.[hash].js'
            }]
        }]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '30-50'
            }
        })
    ]
};
}