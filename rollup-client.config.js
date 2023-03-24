import resolve from '@rollup/plugin-node-resolve';
// import babel from '@rollup/plugin-babel';
import { rollupPluginHTML } from '@web/rollup-plugin-html';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import esbuild from 'rollup-plugin-esbuild';
import minifyTemplateLiterals from "rollup-plugin-minify-template-literals";

export default {
    input: "index.html",
    output: {
        dir: "dist/client",
    },
    preserveEntrySignatures: false,
    inlineDynamicImports: true,
    plugins: [
        /** Minify html and css tagged template literals */
        minifyTemplateLiterals(),

        /** Enable using HTML as rollup entrypoint */
        rollupPluginHTML({
            minify: true,
        }),

        /** Resolve bare module imports */
        resolve({
            browser: true,
        }),

        /** Minify JS, compile JS to a lower language target */
        esbuild({
            minify: true,
            target: 'es2020',
        }),

        /** Bundle assets references via import.meta.url */
        importMetaAssets(),
    ],
};
