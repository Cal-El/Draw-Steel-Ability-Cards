import tailwindcss_opentype from "tailwindcss-opentype";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Constantia'],
        'body': ['Constantia'],
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'action-card': '#397d46',
      'maneuver-card': '#395b7d',
      'triggered-action-card': '#7d3939',
      'cardback': '#f6f1e8',
      'keyword-backing': '#b87f47',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
  },
  plugins: [
    tailwindcss_opentype,
  ],
}
