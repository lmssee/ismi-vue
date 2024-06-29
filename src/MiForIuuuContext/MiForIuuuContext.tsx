import { defineComponent, ref } from 'vue';
import type { App } from 'vue';
import './MiForIuuuContext.scss';

/**  组件 MiForIuuuContext 内容部分   */
const MiForIuuuContext = defineComponent({
  name: 'MiForIuuuContext',
  __name: 'MiForIuuuContext',
  /**
   *  这里是该组件的被调参数，将作为 setUp 的回调第一实参的名
   */
  // props:{},
  /** 导出的默认事件  */
  // emits:[],
  setup(props, ctx) {
    return () => (
      <div class={`mi_for_iuuu_context_class`}>{ctx.slots.default && ctx.slots.default()}</div>
    );
  },
});

/** 安装器  */
MiForIuuuContext.install = function (app: App) {
  app.component(MiForIuuuContext.name as string, MiForIuuuContext);
  return app;
};

export { MiForIuuuContext };
