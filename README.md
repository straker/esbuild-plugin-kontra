# Esbuild plugin kontra

Esbuild plugin for Kontra.js to remove unused code from Classes 

## Installation

```bash
npm install --save-dev esbuild-plugin-kontra 
```

## Usage

```js
// rollup.config.js
const esbuild = require('esbuild');
const kontra = require('esbuild-plugin-kontra');

esbuild
  .build({
    entryPoints: ['index.js'],
    bundle: true,
    outdir: 'build',
    plugins: [
      kontra({
        gameObject: {
          // enable only velocity and rotation functionality
          velocity: true,
          rotation: true
        },
        vector: {
          // enable vector length functionality
          length: true
        },
        // turn on debugging
        debug: true
      })
    ]
  });
```

## Options

See [Kontra.js docs](https://straker.github.io/kontra/reducing-file-size#available-options) for a list of available options. All options default to `false`.
