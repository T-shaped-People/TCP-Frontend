const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // target: 'http://43.201.36.11:3000',
            target: 'http://localhost:3000',
            changeOrigin: true
        }),
    );
};