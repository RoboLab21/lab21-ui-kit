import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'lab21',
  srcDir: 'src',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    reactOutputTarget({
      componentCorePackage: '@lab21/core',
      proxiesFile: '../react/src/components/index.ts',
      outDir: '../react/src/components',
      includeImportCustomElements: true,
      loaderDir: '../loader',
    }),
    vueOutputTarget({
      componentCorePackage: '@lab21/core',
      proxiesFile: '../vue/src/components/index.ts',
      outDir: '../vue/src/components',
      includeImportCustomElements: true,
      loaderDir: '../loader',
    }),
  ],
};