import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import postcssImport from 'postcss-import';
import cssnano from 'cssnano';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/elemental-ui.min.js',
        format: 'iife',
        name: 'ElementalUI',
        sourcemap: true,
        globals: {
        }
    },
    plugins: [
        resolve({
            browser: true,
            preferBuiltins: false
        }),
        commonjs({
            include: 'node_modules/**'
        }),
        postcss({
            extract: 'elemental-ui.min.css',
            minimize: true,
            modules: true,
            plugins: [
                postcssImport(),
                tailwindcss(),
                autoprefixer(),
                cssnano({
                    preset: ['default', {
                        discardComments: {
                            removeAll: true
                        }
                    }]
                })
            ]
        }),
        terser({
            format: {
                comments: false
            }
        })
    ],
    external: [
    ]
};
