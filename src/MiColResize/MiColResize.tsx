import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, Teleport } from 'vue';
import type { App, PropType } from 'vue';
import './MiColResize.scss';
import { useMiEventListener, useMiThrottle } from '../tools';

/**  组件 MiColResize 内容部分   */
const MiColResize = defineComponent({
  name: 'MiColResize',
  __name: 'MiColResize',
  /**
   *  这里是该组件的被调参数，将作为 setUp 的回调第一实参的名
   */
  props: {
    direction: {
      type: String as PropType<'left' | 'right' | 'top' | 'bottom'>,
      //   validator(value: string) {
      //     return ['left', 'top', 'right', 'bottom'].includes(value);
      //   },
      default: 'right',
    },
    backgroundColor: {
      type: String,
      default: ' #25252525',
    },
    left: { type: String, default: '1px' },
    top: { type: String, default: '1px' },
    right: { type: String, default: '1px' },
    bottom: { type: String, default: '1px' },
    width: { type: String, default: '1px' },
    height: { type: String, default: '1px' },
  },
  /**
   *
   */
  emits: ['upMove'],
  setup(props, ctx) {
    /*** 暂存 body  cursor 样式 */
    const bodyStyleCursor = ref('');
    /** 显得一些样式
     *
     * 跟据设定的 props.direction 值来设定默认的外观样式及光标样式
     */
    const lineStyle = computed(() => {
      const { left, top, right, bottom, width, height, backgroundColor } = props;
      let style: {
        width?: string;
        height?: string;
        left?: string;
        top?: string;
        right?: string;
        bottom?: string;
        backgroundColor?: string;
        cursor?: string;
      } = {};
      switch (props.direction) {
        case 'left':
          style = {
            left,
            top: '0px',
            width,
            height: '100%',
            cursor: 'col-resize',
          };
          break;
        case 'top':
          style = {
            top,
            left: '0px',
            width: '100%',
            height,
            cursor: 'row-resize',
          };
          break;
        case 'right':
          style = {
            top: '0px',
            right,
            width,
            height: '100%',
            cursor: 'col-resize',
          };
          break;
        case 'bottom':
          style = {
            bottom,
            left: '0px',
            width: '100%',
            height,
            cursor: 'row-resize',
          };
          break;
      }
      style.backgroundColor = backgroundColor;
      return style;
    });
    /** 是否已经开始拖拽 */
    const dragStart = ref(false);
    /** body 元素  */
    const body = document.querySelector('body');
    /** 这个元素 */
    const element = ref(null);
    /** 元素位置
     *
     *  记录元素的原始位置和新位置，并返回差值给调用父级
     */
    const elementPosition = reactive({
      old: {
        pageX: 0,
        pageY: 0,
      },
      new: {
        pageX: 0,
        pageY: 0,
      },
    });
    /** 放在节流的 move 事件回调  */
    /** 使用 body 监听 ，并自动在组件 unMound 时移除监听 */
    useMiEventListener(body, 'mousedown', startDrag);
    useMiEventListener(body, 'mousemove', dragging);
    useMiEventListener(body, 'mouseup', dragEnd);
    useMiEventListener(body, 'mouseleave', dragEnd);

    /** 开始拖动左侧 */
    function startDrag(e: MouseEvent): void {
      if (e.target != element.value) return;
      dragStart.value = true;
      bodyStyleCursor.value = body?.style.cursor || '';
      body &&
        body.style &&
        (body.style.cursor =
          props.direction == 'left' || props.direction == 'right' ? 'col-resize' : 'row-resize');

      elementPosition.old = {
        pageX: e.pageX,
        pageY: e.pageY,
      };
    }

    /** 拖动中 */
    function dragging(e: MouseEvent): void {
      if (dragStart.value == true) {
        elementPosition.new = {
          pageX: e.pageX,
          pageY: e.pageY,
        };
        ctx.emit('upMove', {
          originPosition: elementPosition.old,
          currentPosition: elementPosition.new,
          difference: [e.pageX - elementPosition.old.pageX, e.pageY - elementPosition.old.pageY],
        });
      }
    }

    /** 结束拖动 */
    function dragEnd(e: MouseEvent): void {
      /// 执行最后一次
      dragging(e);
      dragStart.value = false;
      // 恢复暂存的 body.style.cursor 的样式
      body && body.style && (body.style.cursor = bodyStyleCursor.value);
    }

    return () => (
      <div class="mi_col_resize_class col-resize" style={lineStyle.value} ref={element}></div>
    );
  },
});

/** 安装器  */
MiColResize.install = function (app: App) {
  app.component(MiColResize.name as string, MiColResize);
  return app;
};

export { MiColResize };
