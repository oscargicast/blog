import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}",
    "!./src/pages/og-image/[slug].png.ts",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
} satisfies Config;
