/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'text': '#f4edec',
        'background': '#0a0605',
        'primary': '#975853',
        'secondary': '#465530',
        'accent': '#507f48',
       },      
    },
  },
};
