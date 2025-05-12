import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      outfit: ['Outfit', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      screens: {
        'sm': '1300px',      
        'md': '1500px',      
        'lg': '1800px',     
        'xl': '3000px',     
      },
      fontSize: {
        '20xl': '15rem', 
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Define your custom colors here
        primary: '#1D4ED8', // Example primary color
        secondary: '#9333EA', // Example secondary color
        accent: '#F97316', // Example accent color
        neutral: '#F3F4F6', // Example neutral color
        'dark-gray': '#1F2937', // Custom dark gray color
        'light-gray': '#D1D5DB', // Custom light gray color
      },
    },
  },
  plugins: [],
};

export default config;