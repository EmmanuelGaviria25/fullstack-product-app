/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f680', // Color principal
          text: '#2c2a29', // Texto principal
          hover: '#3b82f680', // Hover principal
        },
        secondary: {
          DEFAULT: '#f2b0b0', // Color secundario
          text: '#2a292c', // Texto secundario
          hover: '#e8a6a6', // Hover secundario
        },
        neutral: {
          light: '#f5f5f5', // Fondo claro
          dark: '#333333', // Texto oscuro
        },
      },
    },
  },
  plugins: [],
};

