const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://54.180.118.42:3000',
            changeOrigin: true
        }),
    );
    app.use(
        '/socket.io',
        createProxyMiddleware({
            target: 'http://54.180.118.42:3000',
            changeOrigin: true
        }),
    );
};