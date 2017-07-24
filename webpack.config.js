const path = require('path');
module.exports = {
    entry: './client/js/main.js',
    output: {
        filename: 'bundle.js',
         path: path.resolve(__dirname, 'server/public/js')
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}