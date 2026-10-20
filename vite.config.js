import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base: './'` emits relative asset URLs, so the same build works on
// GitHub Pages (username.github.io/Albatross/) and on a custom domain root.
export default defineConfig({
  base: './',
  plugins: [react()],
})
