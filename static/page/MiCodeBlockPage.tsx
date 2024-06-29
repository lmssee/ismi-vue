import { defineComponent } from 'vue';
import { MiCodeBlock, MiForIuuuContext } from '../../index';

export default defineComponent({
  name: 'MiCodeBlockPage',
  setup() {
    const code = `html from  'html ; import html from  'html ;154564646546544444444444444444444444444444444444444444444444444444444444
    <html />
               <html />
    <html />
    <html />
                <html />
    <html />
    <html />
    <html />
    <html />
    <html />
    <html />
    <html />
    <html />
    <html />
    <html />
 
    const a = "1";`;
    return () => (
      <MiForIuuuContext>
        <h1>你好，这里是一个测试组件 MiCodeBlock 页面</h1>
        <h2>当 copy 为 false</h2>
        <MiCodeBlock code={code} copy={false}></MiCodeBlock>
        <h2>当 copy 为缺省</h2>
        <MiCodeBlock
          code="11"
          type="12222222222222222222222222222222222224444444444444444444444444444444444444444444444444444444444444422"
        ></MiCodeBlock>
      </MiForIuuuContext>
    );
  },
});
