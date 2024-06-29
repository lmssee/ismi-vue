import { defineComponent, version } from 'vue';
import { MiForIuuuContext, MiPage } from '../../index';

export default defineComponent({
  name: 'MiPagePage',
  setup() {
    return () => (
      <MiForIuuuContext>
        <h1>你好，这里是一个测试组件 MiPage 页面</h1>
        <div>vue 的版本为： {version}</div>
        <MiPage></MiPage>
      </MiForIuuuContext>
    );
  },
});
