import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves this app from /ai-harness-3d-viewer/, everywhere else
// (local dev, preview, Playwright) it's served from the root.
const base = process.env.GITHUB_PAGES ? '/ai-harness-3d-viewer/' : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
