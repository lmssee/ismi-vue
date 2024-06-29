import { defineComponent } from 'vue';
import { MiFloatBack } from '../../index';

export default defineComponent({
  name: 'MiFloatBackPage',
  setup() {
    return () => (
      <>
        <div>你好，这里是一个测试组件 MiFloatBack 页面</div>
        <MiFloatBack></MiFloatBack>
      </>
    );
  },
});
