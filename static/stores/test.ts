import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/*** 定义一个 test store 数据仓库
 *
 *  pinia 定义仓库有两种模式 ： option 、Setup
 *
 *  # setUp
 *  ```ts
 *
 * export const useTestStore = defineStore('test', () => {
 *     const count = ref(0);
 *     const half = computed(() => Math.floor(count.value));
 *     function addOneTenth(){
 *         count.value++
 *     }
 *    function $reset(){
 *        count.value = 0;
 *     }
 *     return {count , half, addOneTenth , $reset}
 * });
 *
 *
 *  ```
 *  # option
 *  与 vue 的选项式 API 类似，使用 state、actions、getters 属性的 Options 对象来定义仓库形式
 *  ```ts
 *  export const useTestStore = defineStore('test',{
 *      state:() => ({
 *         count: 0,
 *      }),
 *       getters: {
 *           half: (state: { count: number }) => Math.round(state.count / 2),
 *       },
 *       actions: {
 *           addOneTenth() {
 *               this.count++;
 *           },
 *       },
 * });
 * ```
 *
 *
 * ### 使用仓库
 *  ```TS
 *  const testData = useTestStore();
 *  ```
 *  使用其并保证其响应性，可以使用 `storeToRefs(store)`
 *
 * ### State
 *  使用 $reset 方法将 state 重置为初始值 （但是在 SetUp 中，需要自己创建该方法）
 *
 *  使用 $patch 方法可以同时更改多个属性
 *
 * ### Getter
 *  因此，即使在使用常规函数定义 getter 时，我们也可以通过 this 访问到整个 store 实例，但(在 TypeScript 中)必须定义返型。这是为了避免 TypeScript 的已知缺陷，不过这不影响用箭头函数定义的 getter，也不会影响不使用 this 的 getter。
 *
 */
export const useTestStore = defineStore('test', () => {
  const count = ref(0);
  const half = computed(() => Math.floor(count.value));
  function addOneTenth() {
    count.value++;
  }
  function $reset() {
    count.value = 0;
  }
  return { count, half, addOneTenth, $reset };
});
