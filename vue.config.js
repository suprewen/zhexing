const path = require('path')

module.exports = {
  pages: {
    //TODO change the directories of index
    index: {
      entry: 'src/main.js',
      template: 'public/index.html'
    },
    manage: {
      entry: 'src/pages/manage/manage.js',
      template: 'public/manage.html'
    }
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(
        config.module.rule('less').oneOf(type),
        path.resolve(__dirname, './src/less/*.less')
      )
    )

    types.forEach(type =>
      addStyleResource(
        config.module.rule('scss').oneOf(type),
        path.resolve(__dirname, './src/scss/*.scss')
      )
    )
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}

function addStyleResource(rule, patterns) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: patterns
    })
}
