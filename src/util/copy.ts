import { ElMessage } from 'element-plus'

// `navigator.clipboard` 可能因浏览器设置或浏览器兼容而造成兼容问题
export function copyText(text: string, prompt: string | null = 'Copied to the clipboard successfully!') {
  if (navigator.clipboard) {
    return navigator.clipboard
      .writeText(text)
      .then(() => {
        prompt && ElMessage.success(prompt);
      })
      .catch((error) => {
        ElMessage.error('Copied error!' + error.message);
        return error;
      });
  }
  if (Reflect.has(document, 'execCommand')) {
    return new Promise<void>((resolve, reject) => {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        // 在手机 Safari 浏览器中，点击复制按钮，整个页面会跳动一下
        textArea.style.width = '0';
        textArea.style.position = 'fixed';
        textArea.style.left = '-999px';
        textArea.style.top = '10px';
        textArea.setAttribute('readonly', 'readonly');
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        prompt && ElMessage.success(prompt);
        resolve();
      } catch (error) {
        ElMessage.error('Copied failed!' + error.message);
        reject(error);
      }
    });
  }
  // return Promise.reject(`"navigator.clipboard" 或 "document.execCommand" 中存在API错误, 拷贝失败!`);
}
