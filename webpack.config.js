const webpack = require('webpack');

module.exports = {
  // other webpack config options...

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        // add any other environment variables you want to use here
      },
    }),
  ],
};

