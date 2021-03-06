const Server = require('./server.js')
const port = (process.env.PORT || 8080)
const app = Server.app()

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const config = require('../webpack.dev.config.js')
    const compiler = webpack(config)

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        hot: true,
        filename: 'bundle.js',
        publicPath: '/public/',
        stats: {
            colors: true,
        }
    }));

    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack__hmr'
    }))
}

app.listen(port)
console.log(`Listening at http://localhost:${port}`)
