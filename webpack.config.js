const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/index.ts',
   mode: 'development',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js'
   },
   devtool: 'inline-source-map',
   resolve: {
      extensions: [".js", ".ts"]
    },
   devServer: {
      port: 3000,
      open: true
   },
   module: {
      rules: [
         {
           test: /\.css$/i,
           use: ["style-loader", "css-loader"]
         },
         {
            test: /\.ts?$/,
            use: {
               loader: "babel-loader",
               options: {
               //   cacheDirectory: true, // Использование кэша для избежания рекомпиляции
                 presets: ["@babel/preset-typescript"],
               },
            },
            exclude: /node_modules/,
          },
       ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template:path.resolve(__dirname, './public/index.html'),
         title: 'DropDown'  
   })],
}