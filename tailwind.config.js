/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-primary': '#5F35F5',
      }
    },

    fontFamily: {
      'nunito': ['Nunito', 'sans-serif'],
      'lobster': ['Lobster', 'sans-serif'],
      'agbalumo': ['Agbalumo', 'sans-serif']
    },
  },
  plugins: [],
}