import { defineComponent } from 'vue';
import { MiForIuuuContext } from '../../index';

export default defineComponent({
  name: 'MiForIuuuContextPage',
  setup() {
    return () => (
      <>
        <div>你好，这里是一个测试组件 MiForIuuuContext 页面</div>
        <MiForIuuuContext></MiForIuuuContext>
      </>
    );
  },
});
