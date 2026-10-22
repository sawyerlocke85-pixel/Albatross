import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import { updatesPlugin } from './scripts/vite-plugin-updates.mjs'

// BASE_PATH is set by the GitHub Pages workflow ("/Albatross/" on github.io,
// "/" once a custom domain is configured). Local dev always uses "/".
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), imagetools(), updatesPlugin()],
})
