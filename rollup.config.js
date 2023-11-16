import commonjs from '@rollup/plugin-commonjs';
import { env } from "process";
import json from '@rollup/plugin-json';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const isProd = (env.NODE_ENV === "production");
console.log("Is production: ", isProd);

export default {
  input: 'main.ts',
  output: {
    dir: '.',
    sourcemap: isProd?false:'inline',
    format: 'cjs',
    exports: 'default'
  },
  external: ['obsidian', 'http', 'https', 'url', 'stream', 'crypto', 'net', 'child_process', 'dns',
             'os', 'fs', 'tls', 'zlib'],
  plugins: [
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    json(),
    typescript(),
  ]
};