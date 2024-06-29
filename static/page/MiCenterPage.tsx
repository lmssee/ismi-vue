import { defineComponent } from 'vue';
import { MiCenter, MiForIuuuContext } from '../../index';

export default defineComponent({
  name: 'MiCenterPage',
  setup() {
    return () => (
      <MiForIuuuContext>
        <h1>你好，这里是一个测试组件 MiCenter 页面</h1>
        <MiCenter></MiCenter>
      </MiForIuuuContext>
    );
  },
});
