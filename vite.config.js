import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import glsl from 'vite-plugin-glsl'   // 👈 استيراد البلجن

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Hamza/',
  plugins: [
    react({
      devTools: true,
    }),
    glsl(),  // 👈 أضف البلجن هنا
  ],
  css: {
    devSourcemap: true, 
  },
})

