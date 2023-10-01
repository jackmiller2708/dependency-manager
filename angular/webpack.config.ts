//Polyfill Node.js core modules in Webpack. This module is only needed for webpack 5+.
import { Configuration } from 'webpack';
import * as NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

/**
 * Custom angular webpack configuration
 */
module.exports = (config: any, options: any): Configuration => {
  config.target = 'electron-renderer';

  if (options.fileReplacements) {
    for (let fileReplacement of options.fileReplacements) {
      if (fileReplacement.replace !== 'src/environments/environment.ts') {
        continue;
      }

      const fileReplacementParts = fileReplacement['with'].split('.');

      if (fileReplacementParts.length > 1 && fileReplacementParts[1].includes('web')) {
        config.target = 'web';
      }

      break;
    }
  }

  config.plugins = [
    ...config.plugins,
    new NodePolyfillPlugin({ excludeAliases: ['console'] }),
  ];

  // https://github.com/ryanclark/karma-webpack/issues/497
  config.output.globalObject = 'globalThis';

  return config;
};
