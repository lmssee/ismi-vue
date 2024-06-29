import * as components from './src/index';
export * from './src/index';
import type { App } from 'vue';

/**
 *  也可以将其他模块， type 在这里进行导出
 */
export const install = function (app: App) {
  for (const key in components) {
    const element: any = (components as any)[key];
    if (element.install) app.use(element);
  }

  return app;
};

// 导出默认 tools
export { useMiThrottle, useMiDebounce, useMiEventListener } from './src/tools/index';

export type { MiColResizeUpMoveType } from './src/types';

export default install;
