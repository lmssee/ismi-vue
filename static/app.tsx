import { defineComponent, onMounted, ref } from 'vue';
import { MiCenter, MiFloatBack, MiPage } from '../index';

export default defineComponent({
  name: 'app',
  setup() {
    const urlList = ref([
      { url: '/TestButton', text: '首页' },
      { url: '/MiButton', text: '按钮' },
      { url: '/MiPage', text: '页面' },
      { url: '/miCodeBlock', text: '代码块' },
      { url: '/miCodeBlock', text: '代码块' },
      { url: '/miCodeBlock', text: '代码块' },
    ]);

    return () => (
      <MiPage>
        {{
          tabBar: () => (
            <MiFloatBack direction="column">
              {urlList.value.map(currentEle => (
                <router-link to={currentEle.url}>{currentEle.text}</router-link>
              ))}
            </MiFloatBack>
          ),
          default: () => (
            <MiPage footerStyle={{}}>
              {{
                default: () => <router-view></router-view>,
                footer: () => (
                  <MiCenter style={{ fontSize: '0.1rem' }} height="100%">
                    <div>123</div>
                    <a href="a">13456</a>
                  </MiCenter>
                ),
              }}
            </MiPage>
          ),
        }}
      </MiPage>
    );
  },
});
