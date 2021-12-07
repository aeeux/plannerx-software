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
  screens: {
    'xsm': '520px',
    // => @media (min-width: 520px) { ... }
  
    'sm': '640px',
    // => @media (min-width: 640px) { ... }
  
    'md': '768px',
    // => @media (min-width: 768px) { ... }
  
    'lg': '1024px',
    // => @media (min-width: 1024px) { ... }
  
    '2lg': '1148px',
    // => @media (min-width: 1148px) { ... }
  
    'xl': '1280px',
    // => @media (min-width: 1280px) { ... }
  
    '2xl': '1536px',
    // => @media (min-width: 1536px) { ... }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
