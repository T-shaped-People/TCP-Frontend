const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/',
        createProxyMiddleware(['/api', '/socket.io'], {
            target: 'http://54.180.118.42:3000',
            changeOrigin: true,
            ws: true,
            router: {
                '/socket.io': 'ws://54.180.118.42:3000',
            }
        })
    );
};