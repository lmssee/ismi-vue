import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import type { App, PropType } from 'vue';
import './MiPage.scss';
import { MiColResize } from '../MiColResize/MiColResize';
import { MiColResizeUpMoveType } from '../types';
import { useMiEventListener } from '../tools';
/** 参数
 *
 *
 * 还用于 setup 的 props 的类型推断
 *
 * 基础样式
 * ```ts
 *  {
 *      class:String
 *  }
 * ```
 * 带默认值用法
 * ```ts
 * {
 *  // 原始值写法
 *  class:{
 *      default: 'red',
 *      required: true,
 *      type: [String, null]
 *   },
 * // 函数写法
 *  callFn:{
 *      type: Function,
 *      default() {
 *          return 'is mi'
 *      }
 *   },
 *   // 数组或对象写法
 *  count: {
 *      type: Object,
 *      default(rawPros){
 *          return {count: 0, rest(){this.count = 0}}
 *      }
 *   },
 * }
 * ```
 *
 */
/**  组件 MiPage 内容部分
 *
 *
 * ## `attribute`
 *
 *  拥有的可传属性
 *
 * - `class`  {@link String}  赋给外层的 css 类名
 * - `tabBarStyle` 可控的 tab bar 样式属性
 *      - `width`  有 tabBar 时候的宽度，缺省 '7.86rem'
 *      -`minWidth` 最小的 tabBar 的宽度，缺省 '7.26rem'
 *      - `maxWidth` 最大的 tabBar 的宽度，缺省 '20.26rem'
 *      - `borderRight` 右侧的 border 设置，缺省 'none'
 *      - `boxShadow`  盒子阴影
 * - `footerStyle`  脚本可控制样式（height 需要单独传入）
 *      - `height` {@link String} 底部备案区的高度，缺省 '1.88rem'
 *      - `minHeight` {@link String} 可用最小高，缺省 '1.68rem'
 *      - `maxHeight` {@link String} 可用最大高，缺省 '10rem'
 *      - `color` {@link String} 脚本字色, 缺省 '#f36'
 *      - `backgroundColor` {@lnik String} 脚本背景色，缺省 '#000'
 * - `tabBarChangeLine`  是否展示 tabBat 宽度元素尺寸变化线 {@link Boolean} 默认，`false`
 * - `footerChangeLine` 是否展示底部高度展示线 {@link Boolean} 默认 `false`
 *
 * ###
 *
 * ## `slot`
 *
 * 拥有的 `slot`
 *
 *  - `default` 默认内容区域
 *  - `tabBar`  内容区左侧导航栏
 *  - `footer`  底部备案号区
 *
 * ## `emits`
 *
 * - `contextMenu` 右键触发
 * - `footerHeightChange` 脚注高度变化
 * - `tabBarWidthChange` 侧边栏宽度变化
 */
const MiPage = defineComponent({
  name: 'MiPage',
  __name: 'MIPage',

  props: {
    /** 作用与最外层的样式类 */
    class: {
      type: String,
      default: '',
    },
    /** tab bar 部分可控样式  */
    tabBarStyle: {
      type: Object as PropType<{
        width?: string;
        minWidth?: string;
        maxWidth?: string;
        borderRight?: string;
        boxShadow?: string;
      }>,
      default() {
        return {};
      },
    },
    /** 是否展示 tab bar 与 context 之间的调整尺寸线 */
    tabBarChangeLine: {
      type: Boolean,
      default: false,
    },
    /** 脚本样式 */
    footerStyle: {
      type: Object as PropType<{
        height?: string;
        minHeight?: string;
        maxHeight?: string;
        color?: string;
        backgroundColor?: string;
      }>,
      default() {
        return {};
      },
    },
    /** 是否展示 footer 与 context 之间的调整尺寸线 */
    footerChangeLine: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['tabBarWidthChange', 'footerHeightChange', 'contextMenu'],
  /** 组件的事件 */
  setup(props, ctx) {
    /********************************************* 右键相关 ********************************************\
     * 右键相关 \
     **************** 右键相关 开始 ****************/
    useMiEventListener(document.querySelector('div#app'), 'contextmenu', (e: Event): boolean => {
      e.preventDefault();
      ctx.emit('contextMenu');
      return false;
    });
    /*************** 右键相关 结束 ***************/

    /***************************************** footer 相关 *****************************************\
     * footer 相关 \
     **************** footer 相关 开始 ****************/
    /** footer 的高度 */
    const footerHeight = ref('0rem');
    /** 除去 footer 的高度  */
    const layoutHeight = computed(() => {
      if (ctx.slots.footer) {
        return `calc(100% - ${footerHeight.value})`;
      }
      return '100%';
    });
    /** 计算后的样式  */
    const footerStyle = computed(() => {
      return {
        height: '1.88rem',
        minHeight: '1.66rem',
        maxHeight: '15rem',
        color: '#f36',
        backgroundColor: '#000',
        ...props.footerStyle,
      };
    });
    /*************** footer 相关 结束 ***************/

    /***************************************** tab bar 相关 *****************************************\
     * tab bar 相关 \
     **************** tab bar 相关 开始 ****************/
    /** 左侧宽度 */
    const tabBar = computed(() => {
      return {
        width: '7.86rem',
        minWidth: '7.52rem',
        height: layoutHeight.value,
        maxWidth: '20.12rem',
        borderRight: 'none',
        boxShadow: 'none',
        ...props.tabBarStyle,
      };
    });
    /*************** tab bar 相关 结束 ***************/

    return () => (
      <div class={` mi_page_class  ${props.class || ''}`}>
        {/* 有 tabBar 时，将 context 装进 mi_page_layout */}
        {(ctx.slots.tabBar && (
          <WithTabBarContext style={tabBar.value} showLine={props.tabBarChangeLine}>
            {{
              default: ctx.slots.default,
              tabBar: ctx.slots.tabBar,
            }}
          </WithTabBarContext>
        )) ||
          // 没有 tabBar 时，直接暴露出 context
          // 且此时的高度正好是全高
          (ctx.slots.default && (
            <div class={`mi_page_context`} style={{ height: layoutHeight.value }}>
              {ctx.slots.default()}
            </div>
          ))}
        {/* 页脚设定 */}
        {ctx.slots.footer && (
          <MiPageFooter
            style={footerStyle.value}
            lineShow={props.footerChangeLine}
            onHeightChange={(e: string) => ctx.emit('footerHeightChange', (footerHeight.value = e))}
          >
            {ctx.slots.footer()}
          </MiPageFooter>
        )}
      </div>
    );
  },
});

/*** 带 tabBar 的内容区 */
const WithTabBarContext = defineComponent({
  name: 'WithTabBarContext',
  __name: 'WithTabBarContext',
  props: {
    style: {
      type: Object as PropType<{
        /** 元素宽 */
        width: string;
        /** 元素宽最小值 */
        minWidth: string;
        /** 元素宽最大值 */
        maxWidth: string;
        /** 元素高 */
        height: string;
        /** 右侧边框 */
        borderRight: string;
        /** 盒阴影 */
        boxShadow: string;
      }>,
      required: true,
    },
    showLine: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  setup(props, ctx) {
    /***************************************** tabBar width  相关部分 *****************************************\
     * tabBar width  相关部分 \
     **************** tabBar width  相关部分 开始 ****************/
    /** 用于展示的真实宽度 (使用同 props 属性名变量是为了在外界没有使用 v-model 或未传值时能够变更数据) */
    const tabBarWidth = ref('7.52rem');
    /** 包含 tabBar 的右侧宽度 */
    const contextWidth = computed(() => {
      if (ctx.slots.tabBar) {
        return `calc(100% - ${tabBarWidth.value})`;
      }
      return '100%';
    });
    /** 监听外侧变化则给 tabBarWidth 赋新值 */
    watch(
      () => props.style.width,
      newValue => {
        tabBarWidth.value = newValue;
      },
    );
    /*************** tabBar width  相关部分 结束 ***************/
    return () => (
      <div class={`mi_page_layout`} style={{ height: props.style.height }}>
        {/* 包含 tab bar */}
        {ctx.slots.tabBar && (
          <div
            class={`mi_page_tab-bar`}
            style={{
              ...props.style,
              width: tabBarWidth.value,
            }}
          >
            {ctx.slots.tabBar()}
            {props.showLine && (
              <MiColResize
                onUpMove={(e: MiColResizeUpMoveType) =>
                  ctx.emit(
                    'update:tabBarWidth',
                    (tabBarWidth.value = e.currentPosition.pageX + 'px'),
                  )
                }
                backgroundColor="#0f03"
              ></MiColResize>
            )}
          </div>
        )}
        {ctx.slots.default && (
          <div class={`mi_page_context`} style={{ width: contextWidth.value }}>
            {ctx.slots.default()}
          </div>
        )}
      </div>
    );
  },
});

/** 页脚部分拿出来设置  */
const MiPageFooter = defineComponent({
  name: 'MiPageFooter',
  __name: 'MiPageFooter',
  /** 有父元素传进来的值 */
  props: {
    style: {
      type: Object as PropType<CSSStyleValue>,
      default() {
        return {};
      },
    },
    lineShow: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: ['heightChange'],
  setup(props, ctx) {
    const element = ref();
    /***************************************** 当 footer height value change *****************************************\
     * 当 footer height value change \
     * 当前组件设计 footer height change 的地方一共为两处  \
     * 故舍弃了高昂的性能消耗 watch，改用函数设定值
     **************** 当 footer height value change 开始 ****************/
    const setNewFooterHeight = (newValue: string) =>
      ctx.emit('heightChange', (footerHeight.value = newValue));
    /*************** 当 footer height value change 结束 ***************/

    /** *************************************** footer height 相关 *****************************************\
     * footer height 相关 \
     * 使用  \
     **************** footer height 相关 开始 ****************/
    /** 用于展示的真实宽度
     *
     * (使用同 props 属性名变量是为了在外界没有使用 v-model 或未传值时能够变更数据) */
    const footerHeight = ref('1.86rem');
    /** 监听父组件传值 footer */
    watch(
      () => (props.style as any).height,
      newValue => setNewFooterHeight(newValue),
      {
        immediate: true,
      },
    );

    /** 高度变化  */
    const heightChange = (e: MiColResizeUpMoveType) => {
      setNewFooterHeight(
        `calc(${window.getComputedStyle((element.value as Element).parentElement as Element)['height']} -  ${e.currentPosition.pageY + 'px'} )`,
      );
    };

    /*************** footer height 相关 结束 ***************/

    return () => (
      <div
        class={`mi_page_footer`}
        style={{
          ...props.style,
          height: footerHeight.value,
        }}
        ref={element}
      >
        {' '}
        {props.lineShow && (
          <MiColResize
            onUpMove={heightChange}
            backgroundColor="#0f03"
            direction="top"
          ></MiColResize>
        )}
        {ctx.slots.default && ctx.slots.default()}
      </div>
    );
  },
});

MiPage.install = function (app: App) {
  app.component(MiPage.name as string, MiPage);
  return app;
};

export { MiPage };
