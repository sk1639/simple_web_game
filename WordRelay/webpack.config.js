const { webpack } = require("webpack");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const path = require('path');

let mode = "development"

if (process.env.NODE_ENV === 'production') {
    mode = "production";
}

module.exports = {
    mode: mode,
    entry: {
        app: './client'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [["@babel/preset-env", {
                        targets: {
                            browsers: ['> 5% in KR', 'last 2 chrome versions'],
                        }
                    }],
                    ["@babel/preset-react", { runtime: "automatic" }],

                    ],
                    plugins: ['@babel/plugin-proposal-class-properties', 'react-refresh/babel']
                },
            },
        ]
    },
    plugins: [
        new RefreshWebpackPlugin()
    ],
    devtool: "source-map",
    devServer: {
        publicPath: '/dist/',
        hot: true
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/'
    }
}