const { webpack } = require("webpack");

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

                    ]
                },
            },
        ]
    },
    devtool: "source-map",
    devServer: {
        contentBase: "./dist",
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
}