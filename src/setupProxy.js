const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/',
        createProxyMiddleware(['/api', '/socket.io'], {
            target: 'https://tcp-bssm.kro.kr',
            changeOrigin: true,
            ws: true,
            router: {
                '/socket.io': 'ws://tcp-bssm.kro.kr',
            }
        })
    );
};