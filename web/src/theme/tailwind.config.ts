import type { Config } from "tailwindcss";
import { theme } from "./tokens";

const group = (prefix: string) => Object.fromEntries(
  Object.entries(theme).filter(([key]) => key.startsWith(prefix)).map(([key, value]) => [key.slice(prefix.length), value]),
);

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: group("color-"), spacing: group("space-"), borderRadius: group("radius-"),
    boxShadow: group("shadow-"), fontFamily: { sans: [theme["font-body"]] },
    fontSize: Object.fromEntries(["display", "title", "heading", "body", "label", "small"].map(name => [name, [
      theme[`text-${name}-size` as keyof typeof theme], {
        lineHeight: theme[`text-${name}-line` as keyof typeof theme],
        fontWeight: theme[`text-${name}-weight` as keyof typeof theme],
      },
    ]])),
  } },
  plugins: [],
} satisfies Config;
