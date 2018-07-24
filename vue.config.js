const glob = require('glob');
const pages = {};
glob.sync(`${process.cwd()}/src/views/*/main.ts`).forEach(function (entry) {
  let projectName = /([^/]*)\/main.ts$/.exec(entry)[1]
  pages[projectName] = {
    entry: entry,
    template: 'public/index.html',
    filename: `${projectName}/index.html`
  }
});

module.exports = {
  outputDir: 'www',
  baseUrl: process.env.NODE_ENV === 'production' ? '../' : '/',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/_rem-calc.scss";`
      }
    },
    sourceMap: true
  },
  pages: pages,
  devServer: {
    proxy: {
      '/notification': {
        target: 'http://dev-service.cashalo.com/',
        changeOrigin: true
      },
      '/loan': {
        target: 'http://dev-service.cashalo.com/trade',
        changeOrigin: true
      }
    }
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = '[name]/[name].[chunkhash].js';
      config.output.chunkFilename = 'chunk/[id].[chunkhash].js';
    }
    // 删除默认值config.entry.app
    delete config.entry.app;
  },

  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('extract-css')
        .tap(args => {
          args[0].filename = '[name]/[name].[contenthash:8].css';
          args[0].chunkFilename = 'chunk/[id].[contenthash:8].css';
          return args;
        });

      // 拷贝项目配置
      config
        .plugin('copy')
        .tap(args => {
          args[0].push({
            from: 'src/views/package.json',
            to: ''
          });
          return args;
        });
    }
  },

  pluginOptions: {
    enableInSFC: false
  }
}
