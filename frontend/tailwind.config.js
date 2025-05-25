/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // blue-500
          dark: '#2563EB',    // blue-600
          light: '#60A5FA',   // blue-400
        },
        secondary: {
          DEFAULT: '#10B981', // emerald-500
          dark: '#059669',    // emerald-600
          light: '#34D399',   // emerald-400
        },
        neutral: {
          // Based on gray palette, adjust as per ai-devs.pl style
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        dark: '#0a0f1a',
        dark2: '#151a28',
        neon: '#39ff14',
        neonBlue: '#00eaff',
        accent: '#ff00cc',
        accent2: '#00ffea',
        card: '#181f2f',
        border: '#232b3a',
        error: '#ff3860',
        success: '#39ff14',
        // Add more colors based on ai-devs.pl style if needed
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // A clean, modern font like Inter
        display: ['Orbitron', 'Montserrat', 'sans-serif'],
        body: ['Inter', 'Roboto', 'sans-serif'],
        // mono: ['Roboto Mono', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 8px #39ff14, 0 0 16px #39ff14',
        neonBlue: '0 0 8px #00eaff, 0 0 16px #00eaff',
        accent: '0 0 8px #ff00cc, 0 0 16px #ff00cc',
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s infinite',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 8px #39ff14, 0 0 16px #39ff14' },
          '50%': { boxShadow: '0 0 24px #39ff14, 0 0 48px #39ff14' },
        },
      },
      // Example: Add custom animations or other theme extensions
      // animation: {
      //   'spin-slow': 'spin 3s linear infinite',
      // },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'), // If you need prose styling
    // require('@tailwindcss/aspect-ratio'), // If you need aspect ratio utilities
  ],
}; 