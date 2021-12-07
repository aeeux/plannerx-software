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
    height: {
      "3v": "3vh",
      "5v": "5vh",
      "7v": "7vh",
			"10v": "10vh",
      "12v": "12vh",
      "15v": "15vh",
			"20v": "20vh",
      "25v": "25vh",
			"30v": "30vh",
      "35v": "35vh",
			"40v": "40vh",
      "45v": "45vh",
			"50v": "50vh",
			"60v": "60vh",
			"70v": "70vh",
			"80v": "80vh",
			"90v": "90vh",
			"100v": "100vh",
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
