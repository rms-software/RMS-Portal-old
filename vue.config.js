module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/Portal/' : '/',
    devServer: {
      disableHostCheck: true
    }
}