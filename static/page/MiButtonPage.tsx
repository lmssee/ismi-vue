import { defineComponent } from 'vue';
import { MiButton, MiForIuuuContext } from '../../index';

export default defineComponent({
  name: 'MiButtonPage',
  setup() {
    return () => (
      <MiForIuuuContext>
        <h1>你好，这里是一个测试组件 MiButton 页面</h1>
        <MiButton></MiButton>
      </MiForIuuuContext>
    );
  },
});
