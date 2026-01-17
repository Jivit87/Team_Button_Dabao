/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Udemy Brand Colors
        'u-red': {
          DEFAULT: '#EC5252',
          hover: '#DC2626',
        },
        'u-yellow': {
          DEFAULT: '#FFB81C',
          hover: '#D97706',
        },
        'u-charcoal': '#1F1F1F',
        
        // Text Colors
        'u-black': '#000000',     // Headings
        'u-gray': '#4A4A4A',      // Body
        'u-muted': '#6B7280',     // Muted
        'u-light': '#B0B0B0',     // Placeholder/Light
        
        // Backgrounds
        'u-bg': '#F9F9F9',
        'u-border': '#E5E5E5',
        
        // Semantic
        success: {
          50: '#ECFDF5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        primary: { // Keeping for compatibility with some components
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EC5252',
        },
        accent: { // Keeping for compatibility
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#FFB81C',
          600: '#D97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
