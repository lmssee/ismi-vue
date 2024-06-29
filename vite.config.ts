import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import terser from '@rollup/plugin-terser';
import { MiUiLibraryResolver } from './src/tools/resolver';

export default defineConfig({
  build: {
    // outDir: "out",
    // 是否打包压缩
    minify: false,
    cssMinify: false,
    // 是否 css 拆分
    cssCodeSplit: true,
    rollupOptions: {
      // 打包不引入不引入的依赖
      external: ['vue', 'ismi-js-tools', 'vite', 'ismi-node-tools'],
      // modules: true,
      output: [
        {
          format: 'esm',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          exports: 'named',
          dir: 'exportMjs',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          preserveModules: true,
          exports: 'named',
          dir: 'exportCjs',
        },
      ],
      plugins: [],
    },
    lib: {
      entry: './index.ts',
      name: 'ismi-vue',
    },
  },
  plugins: [
    /**
     * ComponentResolver | ComponentResolver[]
     *
     * ComponentResolverFunction
     *
     * ComponentResolveResult
     */
    vue(),
    vueJsx(),
    Components({
      resolvers: [MiUiLibraryResolver()],
    }),
  ],
});
