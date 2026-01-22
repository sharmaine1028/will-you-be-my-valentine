import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"], // make sure paths include your components
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};

export default config;
