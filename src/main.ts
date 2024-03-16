import { createApp } from "vue";
import "./style.css";
import "uno.css";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

const app = createApp(App);
app.use(VXETable);
app.use(router);
app.use(ElementPlus);

app.mount("#app");

// router.isReady().then(() => {
//   app.mount("#app");
// });
