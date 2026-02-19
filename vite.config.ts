// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or react, if using React
import tailwindcss from 'tailwindcss' // This is optional if you are just using postcss
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [
    react(), // or react()
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})

