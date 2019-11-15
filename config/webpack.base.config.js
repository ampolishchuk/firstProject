const webpack = require('webpack');
const path = require('path'); // Абсолютные пути
const fs = require('fs'); // Работа с файловой системой
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Управляет html файлами
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Вырезает css из js в отдельный файл
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Копирует файлов 

// Пути к основным директориям
const PATHS = {
    s_src: path.join(__dirname, '../src'),
    s_dist: path.join(__dirname, '../dist'),
    s_css: 'css',
    s_js: 'js',
    s_img: 'img',
    s_root: 'root'
}
// Директории точек вхождения для вебпака
PATHS.s_core = `${PATHS.s_src}/core`;
PATHS.s_blocks = `${PATHS.s_core}/blocks`;
PATHS.s_fonts = `${PATHS.s_core}/fonts`;
PATHS.s_pages = `${PATHS.s_src}/pages`;
PATHS.s_templates = `${PATHS.s_pages}/_templates`;

// Имена файлов .pug в директории разработки
PATHS.a_blocks = fs.readdirSync(PATHS.s_blocks)
PATHS.a_blocksWithImg = PATHS.a_blocks.filter((s_blockName) => {        
    return fs.readdirSync(`${PATHS.s_blocks}/${s_blockName}`).filter(s_folderName => s_folderName == 'img').length > 0?true:false;
})

PATHS.a_pages = fs.readdirSync(PATHS.s_pages)
                    .filter(s_pageName => !s_pageName.startsWith('_'))
PATHS.a_templates = fs.readdirSync(PATHS.s_templates)

let entires = {}

PATHS.a_pages.map((s_pageName) => {
    entires[s_pageName] = `${PATHS.s_pages}/${s_pageName}/${s_pageName}.js`
}) 
// PATHS.a_templates.map((s_templateName) => {
//     entires[s_templateName] = `${PATHS.s_templates}/${s_templateName}/${s_templateName}.js`
// })


console.log('Blocks: ')
console.log(PATHS.a_blocks)
console.log('Blocks with img: ')
console.log(PATHS.a_blocksWithImg)
console.log('Pages: ')
console.log(PATHS.a_pages)
console.log('Templates: ')
console.log(PATHS.a_templates)

module.exports = {
    externals: {
        paths: PATHS // Подключение внешних объектов
    },  
    entry: entires,
    output: {
        filename: `${PATHS.s_js}/[name].js`, // Точка выхода
        path: PATHS.s_dist // Путь сохранения файла при сборке
    },
    optimization: { // Выносит подключенные модули в отдельный файл
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.pug/, // Регулярное выражение для обробатываемых файлов
                loader: 'pug-loader' // Используемый loader
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { 
                            sourceMap: true
                        }
                    },  
                    {
                        loader: 'postcss-loader',
                        options: { 
                            sourceMap: true, 
                            config: { 
                                path: './config/postcss.config.js' // Файл конфига postcss
                            } 
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { 
                            sourceMap: true 
                        }
                    }
                ]
            },
            { 
                test: /\.(png|jpg|gif)$/, 
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name].[ext]'
                } 
            },
            { 
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    name: '[name].[ext]'
                } 
            }
        ]
    },
    plugins: [
        ...PATHS.a_pages.map(s_pageName => new HtmlWebpackPlugin({
            template: `${PATHS.s_pages}/${s_pageName}/${s_pageName}.pug`, // Файл шаблона 
            filename: `${PATHS.s_dist}/${s_pageName}.html`, // Обработанный файл
            inject: false
        })),
        new MiniCssExtractPlugin({
            filename: `${PATHS.s_css}/[name].css` // [hash] для добавления хеша к имени файла
        }),
        new CopyWebpackPlugin([            
            { from: `${PATHS.s_src}/${PATHS.s_root}` },
            { from: `${PATHS.s_fonts}`, to: 'fonts' },

            ...PATHS.a_blocksWithImg.map(s_blockName => (
                { from: `${PATHS.s_blocks}/${s_blockName}/img`, to: `img` }
            ))
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
          })
    ],
} 
 