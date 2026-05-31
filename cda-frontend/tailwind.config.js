/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#6366f1',
          slate: '#0F172A',
        },
      },
    },
  },

  plugins: [],
};
