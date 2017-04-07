/**
 * Created by ebi on 2017/2/7.
 */
var path = require('path');
var fs = require('fs');

module.exports = {
    entry: {
        'app': path.resolve('./', 'app.js')
    },
    output: {
        path: 'dist',
        filename: '[name].js',
        //publicPath: 'http://xiazhou.me/example/xiazhou-weex/dist/',
        publicPath: '/dist/',
    },
    node: {
        global: true
    },
    module: {
        loaders: [
            {
                test: /\.vue(\?[^?]+)?$/,
                loaders: ['vue']
            },
            {
                test:/\.js(\?[^?]+)?$/,
                loader: 'babel',
            }
        ]
    }
};