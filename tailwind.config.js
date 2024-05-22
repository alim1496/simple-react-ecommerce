/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        karla: ["Karla", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        lora: ["Lora", "sans-serif"],
      },
    },
  },
  plugins: [],
};
