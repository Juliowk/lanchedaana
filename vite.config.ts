import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// O site é servido em https://juliowk.github.io/lanchedaana/
export default defineConfig({
  base: '/lanchedaana/',
  plugins: [react(), tailwindcss()],
})
