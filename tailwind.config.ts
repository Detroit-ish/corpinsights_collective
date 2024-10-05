import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,css}', // Make sure all relevant file types are included
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007373',       // Teal
        secondary: '#2B3A42',     // Charcoal
        accent: '#FF6F4F',        // Coral
        background: '#F8F8F8',    // Off-White background color
        'off-white': '#F8F8F8',   // Off-white, alias for use in styles
        'light-green': '#A7F3D0', // Properly define light-green to be used in classes like hover:text-light-green
        text: '#333333',          // Standard text color
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
