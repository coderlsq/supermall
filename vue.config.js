/*配置路径的别名，CLI3需要自己创建这个文件*/
module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': '@/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
