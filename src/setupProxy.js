const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/',
        createProxyMiddleware(['/api', '/socket.io'], {
            target: 'http://localhost:3001',
            changeOrigin: true,
            ws: true,
            router: {
                '/socket.io': 'ws://localhost:3001',
            }
        })
    );
};