const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'modules/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],

  daisyui: {
    styled: true,
    themes: ['dark'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
  },
};
