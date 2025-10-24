module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#1a0f0a',
        secondary: '#fed7aa',
        tertiary: '#2d1810',
        'black-100': '#3d2817',
        'black-200': '#2d1810',
        'white-100': '#fef3e2',
      },
      boxShadow: {
        card: '0 35px 120px -15px #ea580c',
      },
      screens: {
        xs: '450px',
      },
      backgroundImage: {
        'hero-pattern': "url('/bgblackhole.png')",
      },
    },
  },
  plugins: [],
};
