// rollup.config.js (building more than one bundle)
//import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default 
{
    input: './build/src/app.js',
    output: 
    [
        {
          file: './build/src/app.js',
          format: 'umd'
        },
        {
          file: './build/src/app.js',
          format: 'es'
        }
    ],
    plugins: [resolve(), commonjs(), json()]
};