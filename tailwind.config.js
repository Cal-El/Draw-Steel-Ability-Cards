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
        'display': ['Consta'],
        'body': ['Consta'],
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'action-card': '#397d46',
      'maneuver-card': '#395b7d',
      'triggered-action-card': '#7d3939',
      'free-triggered-action-card': '#7d3966',
      'free-maneuver-card': '#397d76',
      'routine-card': '#56397d',
      'passive-card': '#7d5339',
      'free-strike-card': '#7d7d7d',
      'cardback': '#f6f1e8',
      'keyword-backing': '#b87f47',
      'zinc-500': '#71717A',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'regal-blue': '#243c5a',
    },
  },
  plugins: [
    tailwindcss_opentype,
  ],
}
