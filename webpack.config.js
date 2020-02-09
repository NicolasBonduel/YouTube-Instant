const path = require('path');

module.exports = {
    mode: 'production',
    entry: './public/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js'),
    },
};
