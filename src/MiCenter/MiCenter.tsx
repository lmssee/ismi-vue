import { defineComponent, ref } from 'vue';
import type { App } from 'vue';
import './MiCenter.scss';

/**  组件 MiCenter 内容部分
 *
 *  ## `slot`
 *  - `default` 仅允许一个默认 `slot`
 *
 */
const MiCenter = defineComponent({
  name: 'MiCenter',
  __name: 'MiCenter',
  /**
   *  这里是该组件的被调参数，将作为 setUp 的回调第一实参的名
   */
  props: {
    /** 内部元素的高 */
    width: {
      type: String,
      default: '50%',
    },
    /** 内部元素的宽 */
    height: {
      type: String,
      default: '50%',
    },
  },
  /** 导出的默认事件  */
  // emits:[],
  setup(props: any, ctx: any) {
    return () => (
      <div class={'mi_center_class'}>
        <div style={{ width: props.width, height: props.height }}>
          {ctx.slots.default && ctx.slots.default()}
        </div>
      </div>
    );
  },
});

/** 安装器  */
MiCenter.install = function (app: App) {
  app.component(MiCenter.name as string, MiCenter);
  return app;
};

export { MiCenter };
