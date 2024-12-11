/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          'inter': ['Inter', 'sans-serif'],
          'roboto': ['Roboto', 'sans-serif'],
          'merriweather': ['Merriweather', 'serif'],
          'playfair': ['Playfair Display', 'serif'],
          'space': ['Space Grotesk', 'sans-serif'],
          'fira': ['Fira Code', 'monospace'],
        }
      }
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }
  
  