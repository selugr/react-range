const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' )
const HtmlWebPackPlugin = require( 'html-webpack-plugin' )
const path = require( 'path' )

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve( __dirname, '../dist' ),
        filename: '[name].[contenthash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                use: ['babel-loader'],
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            },
            {
                type: 'asset',
                test: /\.(png|svg|jpg|jpeg|gif)$/i
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin( {
            template: './public/index.html',
            favicon: './public/favicon.ico'
        } )
    ]
}
