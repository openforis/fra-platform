var path = require('path');

module.exports = {
    entry: './webapp/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
