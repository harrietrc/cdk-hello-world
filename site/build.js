#!/usr/bin/env node

require('esbuild')
  .build({
    stdin: { contents: '' },
    inject: [
        'js/game.js',
        'js/entities/entities.js',
        'js/entities/HUD.js',
        'js/screens/title.js',
        'js/screens/play.js',
        'js/screens/gameover.js',
    ],
    format: 'iife',
    bundle: true,
    outfile: 'build/clumsy-min.js',
    // minify: true
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
