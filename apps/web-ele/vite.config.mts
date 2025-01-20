import { defineConfig } from '@vben/vite-config';

import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        ElementPlus({
          format: 'esm',
        }),
      ],
      server: {
        proxy: {
          '/gateway': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/gateway/, ''),
            // mock代理目标地址
            target: 'http://localhost:8887/gateway',
            ws: true,
          },
        },
      },
    },
  };
});
