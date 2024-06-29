// import { initializeFile, pathJoin } from 'ismi-node-tools';
import { ComponentResolveResult } from 'unplugin-vue-components';
import { join, parse } from 'node:path';

// 获取相对路径
// const [_, __dirname] = initializeFile();

/**
 * ComponentResolver | ComponentResolver[]
 *
 * ComponentResolverFunction
 *
 * ComponentResolveResult
 */
/*** 导出自动导入解析器 */
export function MiUiLibraryResolver() {
  return (name: string) => {
    if (!/(^Mi)|(^mi-)/.test(name)) {
      return;
    }
    const result: ComponentResolveResult = {
      //   ComponentInfo: {
      //     importName: name,
      //     path: join(__dirname, '..', `@ismi-vue/index`),
      //   },
    };
    // 将组件名转化为导入路径

    return result;
  };
}
