import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "zaviago-1z",
    project: "honda",
    authToken: "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"
  })],

  build: {
    sourcemap: true
  }
})