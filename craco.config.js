const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, './src/component'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@modals': path.resolve(__dirname, './src/modals'),
      '@helper': path.resolve(__dirname, './src/helper'),
      '@axios': path.resolve(__dirname, './src/axios'),
      '@config': path.resolve(__dirname, './src/config'),
      '@constant': path.resolve(__dirname, './src/constant'),
      '@custom-hooks': path.resolve(__dirname, './src/custom-hooks'),
    },
    configure: (webpackConfig) => {
      const MiniCssExtractPlugin = webpackConfig.plugins.find(
        (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
      );
      if (MiniCssExtractPlugin) {
        MiniCssExtractPlugin.options.ignoreOrder = true;
      }
      return webpackConfig;
    },
  },
};
