const  createProxyMiddleware  = require('http-proxy-middleware');
const winston = require('winston');

// 1. how to make sure setup proxy is used.
// use an not existion lib, check it is throw error.

module.exports = function (app) {
    app.use(
        '/react/api',
        createProxyMiddleware({
            target: 'http://192.168.0.135',
            pathRewrite: { '^/react/api': '/api' },
            changeOrigin: true,
            // control logging
            logLevel: 'debug',

            // use a different lib for logging;
            // i.e., write logs to file or server
            logProvider: function (provider) {
                return winston;
            },

        })
    );
};
