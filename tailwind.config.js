module.exports = {
  theme: {
    extend: {
      width: {
        4.5: "18px",
      },
      height: {
        4.5: "18px",
      },
      colors: {
        primary: "#0E1D31",
        secondary: "#F9F9F9",
        accent: "#0A58ED",
        tag: {
          red: "#EB5757",
          yellow: "#F2C94C",
          green: "#27AE60",
          purple: "#BB6BD9",
          blue: "#2D9CDB",
          cyan: "#56CCF2",
        },
      },
    },
  },
  plugins: [],
  content: ["./index.html", "./src/**/*.{vue,js,jsx,ts,tsx}"],
};
