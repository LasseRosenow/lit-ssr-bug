import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';
import { esbuildPlugin } from '@web/dev-server-esbuild';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: false,
  port: 3000,
  watch: !hmr,
  /** Resolve bare module imports */
  nodeResolve: true,

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  esbuildTarget: 'auto',

  /** Set appIndex to enable SPA routing */
  appIndex: './index.html',

  plugins: [
    esbuildPlugin({ ts: true, target: 'es2020' }),
    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.lit] }),
  ],
});
