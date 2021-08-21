import path from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MessyPopup',
      fileName: format => `messy-popup.${format}.js`
    },
    rollupOptions: {
      output: {
        // UMD settings
        globals: {
          MessyPopup: 'MessyPopup'
        }
      }
    }
  }
})