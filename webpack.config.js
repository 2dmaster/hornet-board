var path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer');
module.exports = function(env) {
    return {
        devtool:env.NODE_ENV == 'development' ? '#eval' : false,
        entry: {
            'vendors':'./webpack.vendors.js',
            'bundle':'./src/index.js'
        },
        resolve:{
            modules:[
                path.resolve('./src'),
                path.resolve('./node_modules')
            ]
        },
        plugins:[
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            })
        ],
        output: {
            filename: '[name].min.js',
            path: path.join(__dirname, 'www')
        },
        module: {
            rules: [
                // {
                //     test: /\.js$/,
                //     exclude: /(bower_components)/,
                //     use: {
                //         loader: 'babel-loader',
                //         options: {
                //             presets: ['babel-preset-env']
                //         }
                //     }
                // },
                {
                    test: /\.html$/,
                    use:[
                        {
                            loader:'html-loader'
                        }
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        'url-loader?limit=1000&name=[name].[ext]',
                        'img-loader'
                    ]
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?name=fonts/[name].[ext]'
                },
                {
                    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader?name=fonts/[name].[ext]'
                },
                {
                    test: /\.(css|scss)$/,
                    use:[
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader:'sass-loader'
                        },
                        {
                            loader:'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        autoprefixer
                                    ];
                                }
                            }
                        }
                    ]
                }
            ]
        }
    }
};