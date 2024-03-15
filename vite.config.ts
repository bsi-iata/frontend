import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from "unocss/vite";
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 18000,
    host: true,
    proxy: {
    //  "/wms/": {
    //   target: "https://wms-test.shijizhongyun.com",
    //   changeOrigin: true,
    //   rewrite: (path) => path.replace(/^\/wms/, "wms"),
    //  },
    },
   },
  plugins: [vue(), Unocss(), vueJsx()],
})
