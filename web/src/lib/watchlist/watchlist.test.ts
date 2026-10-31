import { describe, expect, it } from "vitest";
import data from "../../../config/ingredients-watchlist.json";
import { loadWatchlist } from "./index";

describe("watchlist loader", () => {
  it("loads bundled entries including E250 and category-specific classes", () => {
    const entries = loadWatchlist();
    expect(entries).toEqual(data);
    expect(entries.find((entry) => entry.e_kodu === "E250")).toMatchObject({
      ad: "Sodyum nitrit",
      esanlamlilar: expect.arrayContaining(["sodium nitrite"]),
      varsayilan_sinif: "caution",
      kategori_siniflari: { "gıda": "avoid" },
    });
    expect(loadWatchlist(JSON.stringify(data))).toEqual(entries);
  });
  it("reports malformed JSON from an injected source", () => {
    expect(() => loadWatchlist('[{"ad":')).toThrow("geçersiz JSON");
  });
  it.each([
    { neden: " " },
    { e_kodu: "250" },
    { esanlamlilar: "nitrit" },
    { varsayilan_sinif: "unknown" },
    { kategori_siniflari: { other: "none" } },
    { son_kontrol: "2026-02-30" },
    { kaynak: "" },
  ])("reports the field in an invalid record: %j", (invalid) => {
    expect(() => loadWatchlist(JSON.stringify([{ ...data[0], ...invalid }]))).toThrow(
      new RegExp(`Referans listesi doğrulanamadı: 0\\.${Object.keys(invalid)[0]}`),
    );
  });
  it("rejects missing required fields and empty lists", () => {
    expect(() => loadWatchlist([{}])).toThrow("0.ad");
    expect(() => loadWatchlist([])).toThrow("Referans listesi doğrulanamadı");
  });
});
