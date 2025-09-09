module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        mobile: '375px', // Mobile
        tablet: '768px', // Tablet
        desktop: '1366px', // Desktop
      },
      colors: {
        gray313: '#313131',
        gray6f7: '#6F767E',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
