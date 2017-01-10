const webpack = require('webpack');


const IS_PRODUCTION = (process.env.NODE_ENV === 'production');


const webpackConfig = {
    entry: [
        './app/index.js'
    ],

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react'],
                plugins: ['transform-decorators-legacy']
            }
        }]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],

    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: 'bundle.js'
    },

    watch: !(IS_PRODUCTION),

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: IS_PRODUCTION ? null : 'inline-source-map'
};


if (IS_PRODUCTION) {
    webpackConfig.plugins.push(
        new webpack.optimize.AggressiveMergingPlugin()
    );
}


module.exports = webpackConfig;
