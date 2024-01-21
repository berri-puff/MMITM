/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },

  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      'pastel',
      'forest',

      {
        ak: {
          primary: '#D3664A',
          secondary: '#022E40',
          accent: '#F2A285',
          neutral: '#8E0045',
          'base-100': '#021B27',
          info: '#E4D6A7',
          success: '#0DAB76',
          warning: '#8E0045',
          error: '#DB5461',
          '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
          '--rounded-btn': '3rem', // border radius rounded-btn utility class, used in buttons and similar element
          '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
          '--animation-btn': '0.25s', // duration of animation when you click on button
          '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
          '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
        },
      },
    ],
  },
};
