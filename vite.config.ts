import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Caminhos relativos: o site abre na raiz localmente e em https://juliowk.github.io/lanchedaana/ no Pages.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
