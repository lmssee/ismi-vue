import { defineComponent } from 'vue';
import { MiColResize } from '../../index';

export default defineComponent({
  name: 'MiColResizePage',
  setup() {
    return () => (
      <>
        <div>你好，这里是一个测试组件 MiColResize 页面</div>
        <MiColResize></MiColResize>
      </>
    );
  },
});
