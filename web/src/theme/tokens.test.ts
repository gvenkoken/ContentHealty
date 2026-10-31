import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { theme } from "./tokens";

describe("Onaylı tasarım belirteçleri", () => {
  it("palet, tipografi, boşluk, yarıçap ve gölgeleri korur", () => {
    expect(theme).toMatchInlineSnapshot(`
{
  "brand-mark-height": "38px",
  "brand-mark-size": "25px",
  "brand-mark-width": "34px",
  "brand-size": "19px",
  "card-title-size": "18px",
  "color-background": "#F6F7F3",
  "color-border": "#D7E0D9",
  "color-error": "#A43C36",
  "color-error-bg": "#FCEEEB",
  "color-info": "#2C5C79",
  "color-info-bg": "#EDF4F9",
  "color-muted": "#5C6D67",
  "color-primary": "#165D56",
  "color-primary-deep": "#104740",
  "color-role-background": "#F6F7F3",
  "color-role-border": "#D7E0D9",
  "color-role-error": "#A43C36",
  "color-role-info": "#2C5C79",
  "color-role-muted": "#5C6D67",
  "color-role-neutral": "#EAF1EB",
  "color-role-primary": "#165D56",
  "color-role-secondary": "#104740",
  "color-role-success": "#28613F",
  "color-role-surface": "#FFFFFF",
  "color-role-text": "#182E2A",
  "color-role-warning": "#80530B",
  "color-success": "#28613F",
  "color-success-bg": "#EDF6EF",
  "color-surface": "#FFFFFF",
  "color-text": "#182E2A",
  "color-tint": "#EAF1EB",
  "color-warning": "#80530B",
  "color-warning-bg": "#FFF4DA",
  "container-width": "1120px",
  "content-width": "1056px",
  "font-body": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  "font-display": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  "font-heading": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  "font-label": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  "font-small": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  "font-title": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  "ingredient-height": "76px",
  "nav-height": "88px",
  "progress-width": "280px",
  "radius-lg": "20px",
  "radius-md": "12px",
  "radius-pill": "999px",
  "radius-sm": "8px",
  "shadow-card": "0 4px 20px rgba(24, 46, 42, 0.04)",
  "shadow-raised": "0 12px 36px rgba(24, 46, 42, 0.09)",
  "space-hero": "64px",
  "space-lg": "16px",
  "space-md": "12px",
  "space-section": "48px",
  "space-sm": "8px",
  "space-xl": "24px",
  "space-xs": "4px",
  "space-xxl": "32px",
  "state-width": "640px",
  "text-body-line": "26px",
  "text-body-size": "16px",
  "text-body-weight": "400",
  "text-display-line": "52px",
  "text-display-size": "44px",
  "text-display-weight": "700",
  "text-heading-line": "30px",
  "text-heading-size": "22px",
  "text-heading-weight": "600",
  "text-label-line": "20px",
  "text-label-size": "14px",
  "text-label-weight": "600",
  "text-small-line": "20px",
  "text-small-size": "13px",
  "text-small-weight": "400",
  "text-title-line": "40px",
  "text-title-size": "32px",
  "text-title-weight": "700",
  "touch-target": "44px",
}
`);
  });
  it("CSS değişkenleri TypeScript belirteçleriyle aynıdır", () => {
    const css = readFileSync(resolve(process.cwd(), "src/theme/tokens.css"), "utf8");
    for (const [key, value] of Object.entries(theme)) {
      expect(css).toContain(`--${key}: ${value};`);
    }
  });
});
