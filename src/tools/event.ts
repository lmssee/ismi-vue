import { nextTick, onMounted, onUnmounted } from 'vue';

/**
 * 使用事件监听和自动移除
 * <p>
 * 并将其绑定至 vue 生命周期函数，使其可以自动的解绑与绑定
 *
 * @export
 * @param {*} target  绑定事件的元素
 * @param {string} event 绑定的具体的事件名称
 * @param {*} callback 回调函数
 */
export function useMiEventListener(target: any, event: string, callback: any) {
  onMounted(() =>
    nextTick(() => {
      target.addEventListener(event, callback);
    }),
  );
  onUnmounted(() => target.removeEventListener(event, callback));
}

/**
 * 防抖函数
 * <p>
 * 防抖的最后一次执行可能会发生在原页面/组件卸载后
 * <p>
 * 所以，结合 vue 3.0 的组合式函数进行清理
 * @export
 * @param {*} callback 回调函数
 * @param {number} delay  延迟的时间
 * @return {*}  返回一个可接受任意长度参数的函数
 */
export function useMiDebounce(callback: any, delay: number): any {
  let timeout: string | number | NodeJS.Timeout | undefined;
  onUnmounted(() => {
    clearTimeout(timeout); // 移除上一次的延迟
  });
  return (...args: any) => (
    clearTimeout(timeout), (timeout = setTimeout(() => Reflect.apply(callback, null, args), delay))
  );
}

/**
 * 节流函数
 * <p>
 * 函数会自己控制状态，所以无需在结束时清除定时器
 * <p>
 * @export
 * @param {*} callback  回调函数
 * @param {number} delay  延迟时间
 * @return {*}  返回一个控制函数
 */
export function useMiThrottle(callback: any, delay: number): any {
  let inThrottle = true;
  return (...args: any) => {
    if (inThrottle) {
      Reflect.apply(callback, null, args);
      inThrottle = false;
      setTimeout(() => (inThrottle = true), delay);
    }
  };
}

/** 监听元素的尺寸变化
 *
 * `childList`、`attributes` 和 `characterData` 中，必须有一个参数为 `true`。否则会抛出 `TypeError` 异常
 *
 * ## options
 *
 * - `subtree` 监听整个之树，包括子树所有的节点属性，默认值 `false`
 * - `childList` 子节点的新增与删除，默认值 `false`
 * - `attributes` 观察所有监听节点的属性值的变化 *若声明了 `attributeFilter` 或是 `attributeOldValue` 时，默认值为 `false`*
 * - `attributeFilter` 声明那些属性名会被监听的数组（若没有该属性，则默认监听所有的属性）
 * - `attributeOldValue` 记录上一次节点的属性变化值。默认值  `false`
 * - `characterData` 监听所有字符的变化。*若声明了 `characterDataOldValue`，则默认为 `false`*
 * - `characterDataOldValue` 记录前一个被监听节点的文本变化，默认值  `false`
 *
 *
 * **还有一种简单的方式就是使用 {@link ResizeObserver}，但是 ResizeObserver 相对 {@link MutationObserver} 来说更新**
 *
 * @param target  {@link Element}  监听目标
 * @param config  {@link MutationObserverInit}  配置
 * @param callback  ` (mutations: MutationRecord[], observer: MutationObserver) => void` 回调函数
 * @returns 返回监听者 {@link MutationObserver}  （仅可以在组件内使用，且组件卸载后需要手动注销）
 */
export function useMiObserveElement(
  target: Element,
  config: MutationObserverInit,
  callback: (mutations: MutationRecord[], observer: MutationObserver) => void,
) {
  // 创建 DOM 树监视
  const elementObserver = new MutationObserver(callback);
  // 注册监听
  elementObserver.observe(target, config);
  // onUnmounted(() => {
  //   // 组件卸载时关闭监听
  //   elementObserver.disconnect();
  // });
  return elementObserver;
}
