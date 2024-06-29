import { computed, defineComponent, onMounted, ref } from 'vue';
import type { App } from 'vue';
import './MiCodeBlock.scss';
import { copyText } from '../tools';

/**  组件 MiCodeBlock 内容部分
 *
 *
 * ## 可传入 props
 *
 * - `type`: {@link String}  展示代码的语言，缺省 'shell'
 * - `code`: {@link String} 展示的代码内容，以 '\n' 换行
 * - `lineHeight` {@link Number} 行高，控制显示样式，缺省 1.8
 * - `copy` {@link Boolean} 是否可复制，缺省 true
 *
 */
const MiCodeBlock = defineComponent({
  name: 'MiCodeBlock',
  __name: 'MiCodeBlock',
  /**
   *  这里是该组件的被调参数，将作为 setUp 的回调第一实参的名
   */
  props: {
    type: { type: String, default: 'shell' },
    code: { type: String, required: true },
    lineHeight: {
      type: Number,
      default: 1.8,
    },
    copy: {
      type: Boolean,
      default: true,
    },
  },
  /** 导出的默认事件  */
  // emits:[],
  setup(props, ctx) {
    /** 总行数 */
    const lineCount = ref(0);
    /** 展示的样式 */
    const textShow = computed(() => {
      const lineCode = props.code.split('\n');
      lineCount.value = lineCode.length;
      return lineCode.map((current: string, index: number) => (
        <Draw text={current} index={index} key={current} copy={props.copy} />
      ));
    });

    return () => (
      <div
        class={`mi_code_block_class`}
        style={{ '--mi-code-block-line-height': props.lineHeight + 'rem' }}
      >
        <div class={`mi_code_block_title`}>
          {props.copy && <div onClick={() => copyText(props.code)}>📋</div>}
          <div>{props.type}</div>
        </div>
        <pre>
          <code>{textShow.value}</code>
        </pre>
      </div>
    );
  },
});

const Draw = defineComponent({
  name: 'draw',
  __name: 'draw',
  props: {
    text: { type: String, required: true },
    index: { type: Number, required: true },
    copy: { type: Boolean, required: true, default: true },
  },
  setup(props, ctx) {
    return () => (
      <span class={`mi-code-block-line`}>
        <span class={`mi-code-block-line-number`}>
          {(props.copy && props.text && props.text.trim() && (
            <>
              <span>{props.index + 1}</span>
              <span onClick={() => copyText(props.text?.trim() || '')}>📋</span>
            </>
          )) || (
            <>
              <span>{props.index + 1}</span>
              <span style="cursor: not-allowed">🔞</span>
            </>
          )}
        </span>
        <span>{props.text}</span>
      </span>
    );
  },
});

/** 安装器  */
MiCodeBlock.install = function (app: App) {
  app.component(MiCodeBlock.name as string, MiCodeBlock);
  return app;
};

export { MiCodeBlock };
