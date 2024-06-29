import { defineComponent } from 'vue';
import { TestButton } from '../../index';

export default defineComponent({
  name: 'TestButtonPage',
  setup() {
    return () => (
      <>
        <div>你好，这里是一个测试组件 TestButton 页面</div>
        <TestButton></TestButton>
      </>
    );
  },
});
