import { defineComponent, ref } from 'vue';
import type { App } from 'vue';
import './MiButton.scss';

/**  组件 MiButton 内容部分   */
const MiButton = defineComponent({
  name: 'MiButton',
  __name: 'MiButton',
  /**
   *  这里是该组件的被调参数，将作为 setUp 的回调第一实参的名
   */
  // props:{},
  /** 导出的默认事件  */
  // emits:[],
  setup(props, ctx) {
    /** 点击计数  */
    const clickCount = ref(0);
    /// 点击计数重置
    const resetCount = (event: any) => (
      event.preventDefault(), event.stopPropagation(), (clickCount.value = 0), false
    );
    return () => (
      <button
        class={'mi_button_class'}
        onClick={() => clickCount.value++}
        onContextmenu={resetCount}
      >
        {clickCount.value == 0 ? '测试按钮' : '您点击了 ' + clickCount.value + ' 下'}
      </button>
    );
  },
});

/** 安装器  */
MiButton.install = function (app: App) {
  app.component(MiButton.name as string, MiButton);
  return app;
};

export { MiButton };
