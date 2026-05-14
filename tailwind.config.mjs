/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fff5f2',
          100: '#ffe6dd',
          200: '#ffc9b5',
          300: '#ffa687',
          400: '#ff7f50',
          500: '#f95f26',
          600: '#e14410',
          700: '#bc330a',
          800: '#952b0d',
          900: '#78270f',
          950: '#401103',
        },
      },
    },
  },
  plugins: [],
};
