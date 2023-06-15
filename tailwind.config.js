/** @type {import('tailwindcss').Config} */
module.exports = {
  // Add support for dark mode, toggled via a class:
  // https://tailwindcss.com/docs/dark-mode
  darkMode: ["class", '[data-mode="dark"]'],
  // Inform Tailwind of where the classes will be defined:
  // https://tailwindcss.com/docs/content-configuration
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  // https://tailwindcss.com/docs/plugins
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
