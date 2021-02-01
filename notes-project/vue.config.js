module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    //на сервер нужно билдить через '\' вместо '' 21 урок
    assetsDir: 'assets',
    productionSourceMap: false
}