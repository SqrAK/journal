var path = require('path');

module.exports = {
    entry: './client/js/test.js',
    output: {
        filename: 'bundle.js'
        // path: path.resolve(__dirname, 'dist')
    }
};
