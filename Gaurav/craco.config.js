const path = require('path');

module.exports = {
  webpack: {
    configure: {
      cache: {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '.cache/webpack')
      }
    }
  }
};