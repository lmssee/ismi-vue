import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  defineProps,
} from 'vue';
import type { App, ComputedRef, PropType, Ref, StyleValue } from 'vue';
import { useMiEventListener, useMiThrottle, useMiObserveElement } from '../tools/index';
import './MiFloatBack.scss';
import { type } from 'os';

const props = defineProps<{
  background?: string;
  matchClass?: string;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  type?: 'full' | 'block';
  floatImage?: string;
  height?: string;
  width?: string;
}>();

/**
 *  组件 MiFloatBack 内容部分
 *
 *  使用 `<RouterLink to="xxx">xxx</RouterLink>` 组作为 `slot` 来创建一个简单的背景滑动块的 tabBar 列表
 *
 *  ## 例子
 *
 * ```ts
 *  <MiFloatBack>
 *     <RouterLink to="/">主页</RouterLink>
 *     <RouterLink to="/blog">博文</RouterLink>
 *     <RouterLink to="/about">关于</RouterLink>
 *  </MiFloatBack>
 * ```
 * ## 可使用参数
 *
 * - `matchClass` 匹配样式 {@link  String}  class  默认 router-link-exact-active
 * - `direction`  子元素排列方向 ,默认值
 * - `width` 外元素的宽 默认  `auto`
 * - `height` 外援数的高 默认 `auto`
 * - `background` 外元素的背景色 ，默认 `transparent`
 * - `floatImage` 浮动块的背景图 （background-image）
 * - `type` 浮动类型，可选 'block' 、'full'，默认 'block'
 * - `scrollSlow` 元素滚动样式， {@link Boolean} ，默认 `true`
 */
const MiFloatBack = defineComponent({
  name: 'MiFloatBack',
  __name: 'MiFloatBack',
  /**
   * 可使用参数
   *
   * - `matchClass` 匹配样式 {@link  String}  class  默认 router-link-exact-active
   * - `direction`  子元素排列方向 ,默认值
   * - `width` 外元素的宽 默认  `auto`
   * - `height` 外援数的高 默认 `auto`
   * - `background` 外元素的背景色 ，默认 `transparent`
   * - `floatImage` 浮动块的背景图 （background-image）
   * - `type` 浮动类型，可选 'block' 、'full'，默认 'block'
   * - `scrollSlow` 元素滚动样式， {@link Boolean} ，默认 `true`
   */
  props: {
    matchClass: {
      type: String,
      default: 'router-link-exact-active',
    },
    direction: {
      type: String as PropType<'row' | 'column'>,
      default: 'colum',
    },
    width: {
      type: String,
      default: 'auto',
    },
    height: {
      type: String,
      default: 'auto',
    },
    background: {
      type: String,
      default: 'transparent',
    },
    floatImage: {
      type: String,
      default: 'linear-gradient(to top left, #0f06, #3ff6)',
    },
    type: {
      type: String as PropType<'block' | 'full'>,
      // validator(value: 'block' | 'full') {
      //   return ['block', 'full'].includes(value);
      // },
      default: 'block',
    },
    scrollSlow: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    /** 数据 */
    const unique_element = reactive({
      /** 当前唯一的元素 */
      index: 0,
      /** 计数器 */
      counter: 0,
      /** 时间戳 */
      timeStamp: setTimeout(() => 0),
      /** 该元素的位置 */
      position: {
        '--float-back-before-top': '0px',
        '--float-back-before-left': '0px',
        '--float-back-before-width': 'auto',
        '--float-back-before-height': 'auto',
      },
    });
    /** 最终元素的样式 */
    const elementStyle = computed(() => {
      nextTick(() => {
        const __ = props.direction == 'column' ? 'top' : 'left';
        // 获取父元素
        const ele: Element = element.value;
        // 获取父元素的数值
        const parentLen = Number(
          window
            .getComputedStyle(ele.parentElement as Element)
            [__ == 'top' ? 'height' : 'width'].replace(/(\d*\.?\d*).*/, '$1'),
        );
        // 获取独一无二的元素的数值
        const uniLen =
          Number(
            unique_element.position[`--float-back-before-${__}`].replace(/(\d*\.?\d*).*/, '$1'),
          ) +
          Number(
            unique_element.position[
              `--float-back-before-${__ == 'top' ? 'height' : 'width'}`
            ].replace(/(\d*\.?\d*).*/, '$1'),
          ) /
            2;
        ele[`scroll${__ == 'top' ? 'Top' : 'Left'}`] = uniLen - parentLen / 2;
        // ele.scrollTop = uniLen < parentLen / 2 ? 0 : uniLen - parentLen / 2;
      });
      return {
        '--float-back-before-back-image': props.floatImage,
        '--float-back-box-shadow': props.type == 'block' ? '3px 3px 5px #1116' : 'none',
        '--float-back-border-radius': props.type == 'block' ? '5px' : 'none',
        'flex-direction': props.direction,
        background: props.background,
        width: 'auto',
        height: 'auto',
        'scroll-behavior': props.scrollSlow ? 'smooth' : '',
        ...unique_element.position,
      };
    });
    /** 获取元素以捕获独一无二的项 */
    const element = ref();
    /** 获取独一无二的元素的位置 */
    const getUniqueElementPosition = () => {
      const unique: any =
        element.value &&
        (element.value as any).children &&
        (element.value as any).children[unique_element.index];
      if (unique) {
        const offset = props.type == 'full' ? 0 : 3;
        unique_element.position = {
          '--float-back-before-top': unique.offsetTop + offset + 'px',
          '--float-back-before-left': unique.offsetLeft + offset + 'px',
          '--float-back-before-width': unique.offsetWidth - offset * 2 + 'px',
          '--float-back-before-height': unique.offsetHeight - offset * 2 + 'px',
        };
      }
    };
    /** 获取唯一元素 */
    const getUnique = () => {
      const classGroup: { [key: string]: number[] } = {};
      /// 这里做了拦截 ts 错误，因为在 element.value 的时候
      const { children } = element.value as any;
      const childrenLength = children.length;
      /** 倘若用户输入了特定的类名  */

      if (props.matchClass) {
        /** 找到给定的特殊 class  */
        for (let index = 0; index < childrenLength; index++) {
          const element = children[index] as Element;
          if (element.classList.contains(props.matchClass)) {
            unique_element.counter = 0;
            unique_element.index = index;
            getUniqueElementPosition();
            return;
          }
        }
      }
      /** 遍历 */
      for (let index = 0; index < childrenLength; index++) {
        const _element = children[index];
        const _class = _element.className;
        if (!classGroup[_class]) classGroup[_class] = [index];
        else classGroup[_class].push(index);
      }
      if (Object.keys(classGroup).length == 1 && unique_element.counter++ < 5) {
        unique_element.timeStamp = setTimeout(getUnique, 100);
        return;
      }
      unique_element.counter = 0;
      for (const key in classGroup) {
        if (Object.prototype.hasOwnProperty.call(classGroup, key)) {
          const _element = classGroup[key];
          if (_element.length == 1) {
            unique_element.index = _element[0];
            getUniqueElementPosition();
            return;
          }
        }
      }
    };
    const resizeCallFn = useMiThrottle(getUnique, 32);
    /** 建立监听页面次尺寸变化，主动更改背景位置 */
    useMiEventListener(window, 'resize', resizeCallFn);
    /** 用于监听父级元素，这个要比上面那个更直接 */

    /***************************************** 监听元素的父级尺寸变化 *****************************************\
     * 监听元素的父级尺寸变化 \
     * 当父元素尺寸发生变化时随之而动 \
     **************** 监听元素的父级尺寸变化 开始 ****************/
    const elementObserver: Ref<undefined | null | MutationObserver> = ref();
    onMounted(() => {
      /** 给当前元素的父元素建立一个监听 */
      elementObserver.value =
        element.value &&
        useMiObserveElement(
          (element.value as Element).parentNode as Element,
          { attributes: true, attributeFilter: ['style'] },
          (mutations: MutationRecord[], observer: MutationObserver) => {
            resizeCallFn();
          },
        );
    });
    // 卸载
    onUnmounted(() => {
      elementObserver.value && elementObserver.value.disconnect();
    });
    /*************** 监听元素的父级尺寸变化 结束 ***************/
    onMounted(() => {
      nextTick(() => {
        getUnique();
      });
    });
    return () => (
      <div
        class={'mi_float_back_class'}
        ref={element}
        onClick={getUnique}
        style={elementStyle.value as StyleValue}
      >
        {ctx.slots.default && ctx.slots.default()}
      </div>
    );
  },
});

/** 注册组件安装器 */
MiFloatBack.install = function (app: App) {
  app.component(MiFloatBack.name as string, MiFloatBack);
  return app;
};

export { MiFloatBack };
