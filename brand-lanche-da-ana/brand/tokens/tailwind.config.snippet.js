// Mesclar em theme.extend do tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        ana: {
          vermelho: '#D63C45',
          vinho: '#7A1C26',
          dourado: '#F2B544',
          rosa: '#FCE8E9',
          tinta: '#2B1A1C',
          'tinta-suave': '#5C4447',
          borda: '#F3D3D5',
        },
      },
      fontFamily: {
        titulo: ['"Baloo 2"', 'Nunito', 'system-ui', 'sans-serif'],
        texto: ['Nunito', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        botao: '18px',
      },
      boxShadow: {
        flutuante: '0 10px 24px rgba(122, 28, 38, 0.28)',
      },
    },
  },
};
