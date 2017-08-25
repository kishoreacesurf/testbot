'use strict';

const fs = require('fs');
const path = require('path');

const babel = require('babel-core');
const glob = require('glob');

const root = path.resolve(path.join(__dirname, '/../'));

const scan = new Promise((resolve, reject) => {
  glob('**/*.js', {
    cwd: root,
    ignore: ['node_modules/**/*.js', 'scripts/**/*.js']
  }, (error, files) => {
    if (error) {
      return reject(error);
    }

    return resolve(files.map(f => path.join(root, f)));
  });
});

const compile = file => new Promise((resolve, reject) => {
  babel.transformFile(file, (error, output) => {
    if (error) {
      return reject(error);
    }

    return resolve({ file, output });
  });
});

const write = (file, content) => new Promise((resolve, reject) => {
  fs.writeFile(file, content, error => {
    return error ? reject(error) : resolve();
  });
});

const build = () => {
  return scan.then(files => {
    return Promise.all(files.map(compile));
  }).then(results => {
    return Promise.all(results.map(result => write(result.file, result.output.code)));
  });
};

module.exports = build;
