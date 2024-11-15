const path = require('path');

module.exports = {
    // ... otras configuraciones ...
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
    // ... otras configuraciones ...
};
