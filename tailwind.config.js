module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        //background colors
        'board-background': '#B33F40',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
