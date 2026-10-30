import "@testing-library/jest-dom/vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { render, within, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("tailwindcss/tailwind.css", () => ({}));

import RootLayout, { viewport } from "./src/app/layout";
import HomePage from "./src/app/page";
import AnalysisPage from "./src/app/analiz/page";
import RetryPage from "./src/app/analiz/yeniden-dene/page";
import ResultPage from "./src/app/sonuc/page";
import ListPage from "./src/app/listem/page";
import AboutPage from "./src/app/hakkinda/page";

afterEach(cleanup);

describe("Uygulama iskeleti", () => {
  it("Türkçe belgeyi, gezinmeyi ve içeriği oluşturur", () => {
    const markup = renderToStaticMarkup(createElement(RootLayout, null, createElement(HomePage)));
    const page = new DOMParser().parseFromString(markup, "text/html");

    // Role queries need an ownerDocument with a window, unlike DOMParser's document.
    const body = document.importNode(page.body, true);
    expect(page.documentElement.getAttribute("lang")).toBe("tr");
    const navigation = within(body).getByRole("navigation", { name: "Ana gezinme" });
    expect(within(navigation).getByRole("link", { name: "Yeni analiz" }).getAttribute("href")).toBe("/");
    expect(within(navigation).getByRole("link", { name: "Listem" }).getAttribute("href")).toBe("/listem");
    expect(within(navigation).getByRole("link", { name: "Hakkında" }).getAttribute("href")).toBe("/hakkinda");
    expect(within(body).getByRole("main").textContent).toContain("Yeni analiz");
  });

  it("Next.js için mobil viewport meta verisini dışa açar", () => {
    expect(viewport).toEqual({ width: "device-width", initialScale: 1 });
  });

  it.each([
    [HomePage, "Yeni analiz"],
    [AnalysisPage, "Analiz hazırlanıyor"],
    [RetryPage, "Analiz tamamlanamadı"],
    [ResultPage, "Analiz sonucu"],
    [ListPage, "Listem"],
    [AboutPage, "Hakkında"],
  ] as const)("yer tutucu sayfayı sunar: %s", (Page, title) => {
    const { getByRole } = render(createElement(Page));
    expect(getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
  });
});
