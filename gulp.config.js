'use strict';

module.exports = function() {
  var config = {
      temp: './.tmp/',
      client: './src/client/',
      allJs: [
          './src/**/*.js',
          './src/*.js'
      ],
      index: './src/client/index.html',
      css: './.tmp/styles.css',
      js: [
          './src/client/app/**/*.module.js',
          './src/client/app/**/*.js',
          '!' + './src/client/app/**/*.spec.js'
      ],
      sass: './src/client/styles/styles.scss',
      bower: {
          json: require('./bower.json'),
          directory: './bower_components/',
          ignorepath: '../..'
      },
      server: './src/server/',
      defaultPort: 7203,
      nodeServer: './src/server/app.js'
  };

    config.getWiredepOptions = function() {
      var options = {
          bowerJson: config.bower.json,
          directory: config.bower.directory,
          ignorePath: config.bower.ignorePath
      };

        return options;
    };

    return config;
};