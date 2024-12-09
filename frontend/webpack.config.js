const path = require('path');

module.exports = {
  
    devServer: {
        setupMiddlewares: (middlewares, devServer) => {
            // tu configuración aquí
            return middlewares;
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.jsx', '.json'],
    },
   
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
                exclude: /node_modules\/lucide-react/  
            }
        ]
    },
    devtool: false,
};
