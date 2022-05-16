const {build} = require('esbuild');
const glob = require('glob');

const entryPoints = glob.sync('src/**/*.ts');

build({
  define: {'prosess.env.NODE_ENV': process.env.NODE_ENV},
  entryPoints,
  outbase: './src',
  outdir: './dist',
  platform: 'node',
  format: 'cjs',
});
