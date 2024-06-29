export function copyText(text: string) {
  const { clipboard } = navigator;
  /** 新式写法 */
  if (clipboard) {
    clipboard.writeText(text);
  } else if ((window as any).clipboardData) {
    /*IE 大哥*/
    (window as any).clipboardData.clearData();
    (window as any).clipboardData.setData('Text', text);
  } else if (document.execCommand) {
    /*  旧式写法*/
    let hover = document.createElement('input');
    hover.value = text;
    document.body.appendChild(hover);
    hover.select();
    document.execCommand('Copy');
    hover.className = 'hover';
    hover.style.display = 'none';
  }
}
