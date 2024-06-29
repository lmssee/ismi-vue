import { defineComponent, ref } from 'vue';
import type { App } from 'vue';
import './TestButton.scss';

/**  组件 TestButton 内容部分   */
const TestButton = defineComponent({
  name: 'TestButton',
  setup(props, ctx) {
    /** 点击计数  */
    const clickCount = ref(0);
    /// 点击计数重置
    const resetCount = (event: any) => (
      event.preventDefault(), event.stopPropagation(), (clickCount.value = 0), false
    );
    return () => (
      <button
        class={'test_button_class'}
        onClick={() => clickCount.value++}
        onContextmenu={resetCount}
      >
        {clickCount.value == 0 ? '测试按钮' : '您点击了 ' + clickCount.value + ' 下'}
      </button>
    );
  },
});

TestButton.install = function (app: App) {
  app.component(TestButton.name as string, TestButton);
  return app;
};

export { TestButton };
