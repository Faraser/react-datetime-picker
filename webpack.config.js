var path = require('path');
var config = {
    context: path.join(__dirname, 'src'), // �������� ����������
    entry: './index', // ���� ��� ������, ���� ��������� - ��������� hash (entry name => filename)
    output: {
        path: path.join(__dirname, 'assets') // �������� ����������
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