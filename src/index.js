/**
 * Flatten a nested object into a flat { "KEY_NESTEDKEY": value } structure
 * @param {object} obj - The object to flatten
 * @param {string} [prefix=''] - Parent key to add as a prefix
 */
function flatten(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, prop) => {
    const pre = prefix.length ? prefix + '_' : prefix;
    if (typeof obj[prop] === 'object') {
      Object.assign(acc, flatten(obj[prop], pre + prop.toUpperCase()));
    }
    else {
      acc[pre + prop.toUpperCase()] = obj[prop];
    }

    return acc;
  }, {});
}

module.exports = (context = {}) => ({
  name: 'kontra',
  setup(build) {
    const path = require('path')
    const fs = require('fs')
    const pp = require('preprocess');

    build.onLoad({ filter: /\.(js|mjs)$/ }, async (args) => {
      const source = await fs.promises.readFile(args.path, 'utf8')
      return {
        contents: pp.preprocess(source, flatten(context), { type: 'js' })
      };
    })
  }
});