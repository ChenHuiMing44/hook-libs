import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve('./', 'src') }
    ]
  },
  server: {
    port: 8114,
    host: '0.0.0.0',
    https: false,
    proxy: {
      "/api_file": {
        target: "http://tservice.imyxg.com:7004/foundation/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api_file/, ""),
      },
      "/query_code": {
        target: "http://127.0.0.1:8116/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/query_code/, "")
      },
    },

  },
  css: {
    modules: {
      generateScopedName: '[local]_[hash:base64:5]',
      localsConvention: 'camelCase'
    }
  },
})
