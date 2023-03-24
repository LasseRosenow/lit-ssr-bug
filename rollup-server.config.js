import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import esbuild from 'rollup-plugin-esbuild';

export default {
    input: "server.ts",
    output: {
        dir: "dist/server",
    },
    preserveEntrySignatures: false,
    plugins: [
        /** Minify JS, compile JS to a lower language target */
        esbuild({
            minify: true,
            target: 'es2020',
        }),

        /** Bundle assets references via import.meta.url */
        importMetaAssets(),
    ],
};
