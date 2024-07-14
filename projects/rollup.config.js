import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const plugins = [commonjs(), resolve()];

const rollupTs = (file) => {
  return {
    input: [`dist/esm/${file}.js`],
    output: [
      {
        file: `dist/cjs/${file}.js`,
        format: 'cjs',
        sourcemap: true,
        inlineDynamicImports: true
      },
      {
        file: `dist/es/${file}.js`,
        format: 'es',
        sourcemap: true,
        inlineDynamicImports: true
      }
    ],
    external: [
      '@angular/cdk',
      '@angular/common',
      '@angular/core',
      '@rolster/helpers-advanced',
      '@rolster/helpers-components',
      '@rolster/helpers-forms',
      'rxjs'
    ],
    plugins
  };
};

export default [rollupTs('index')];
