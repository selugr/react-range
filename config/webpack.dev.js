const { HotModuleReplacementPlugin } = require( 'webpack' )
const ReactRefreshWebpackPlugin = require( '@pmmmwh/react-refresh-webpack-plugin' )
const { merge } = require( 'webpack-merge' )
const common = require( './webpack.common' )

const devConfig = {
    mode: 'development',
    devServer: {
        port: '8080',
        contentBase: './dist',
        open: 'chrome',
        historyApiFallback: true,
        hot: true
    },
    target: 'web',
    module: {
        rules: [
            {
                use: ['style-loader', 'css-loader'],
                test: /\.(css)$/i
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin()
    ],
    devtool: 'eval-source-map'
}

module.exports = merge( common, devConfig )
