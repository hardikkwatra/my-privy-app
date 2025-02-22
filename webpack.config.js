    const path = require('path');

    module.exports = {
    module: {
        rules: [
        {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader'],
            exclude: [
            path.resolve(__dirname, 'node_modules/@coinbase/wallet-sdk')
            ],
        },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    };
