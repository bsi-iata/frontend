import { createApp } from "vue";
import "./style.css";
import "uno.css";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

import i18n from './i18n'

const app = createApp(App);

VXETable.config({
  // 对组件内置的提示语进行国际化翻译
  i18n: (key, args) => i18n.global.t(key, args),
});

app.use(VXETable);
app.use(i18n);
app.use(router);
app.use(ElementPlus);

app.mount("#app");

// router.isReady().then(() => {
//   app.mount("#app");
// });
