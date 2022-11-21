const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/',
        createProxyMiddleware(['/api', '/socket.io'], {
            target: 'http://43.201.36.11:3000',
            changeOrigin: true,
            ws: true,
            router: {
                '/socket.io': 'ws://43.201.36.11:3000',
            }
        })
    );
};