/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        beat: {
          "0%, 100%": { transform: "scale(100%)" },
          "50%": { transform: "scale(110%)" },
        },
      },
      animation: {
        beat: "beat 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
