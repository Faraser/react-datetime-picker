var path = require('path');
var config = {
    context: path.join(__dirname, 'src'), // исходная директория
    entry: './index', // файл для сборки, если несколько - указываем hash (entry name => filename)
    output: {
        path: path.join(__dirname, 'assets') // выходная директория
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [
            {test: /\.jsx$/, loader: 'jsx-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
        ]
    }
};

module.exports = config;