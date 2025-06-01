/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('')",
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        spaceGrotesk: ['Space Grotesk', 'sans-serif'],
        ancizarSans: ['Ancizar Sans', 'sans-serif'],
      }
    },
  },
  plugins: [], 
}