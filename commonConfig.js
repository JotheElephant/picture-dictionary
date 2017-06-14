exports.paths = {
  'webpackConfig': './webpack.config.js',
  'entryTS': 'app/index.ts',
  'srcTS': 'app/**/*.ts',
  'dest': 'dist/',
  'entryHTML': 'app/index.html',
};

exports.options = {
  webpackPort: 9000,
  karmaPort: 9001
};
