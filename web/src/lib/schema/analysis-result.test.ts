import { describe, expect, it } from "vitest";
import { AnalysisResultSchema } from "./index";

const labelResult = {
  urun_adi: "Örnek et ürünü",
  kategori: "gıda",
  icerik_kaynagi: "etiket",
  guven_duzeyi: "yüksek",
  maddeler: [
    { ad: "Et", sinif: "none", gerekce: "Etikette et olarak belirtilmiş.", ilgili_gruplar: [] },
    { ad: "Sodyum nitrit", e_kodu: "E250", sinif: "avoid", gerekce: "Tüketim sıklığına dikkat edilmesi önerilir.", belirsizlik: "Miktar belirtilmemiş.", ilgili_gruplar: ["Çocuklar"] },
  ],
  genel_ozet: "Etiketten iki madde okundu.",
  uyarilar: ["Bu değerlendirme tıbbi tavsiye değildir."],
};
const unknownEstimate = {
  urun_adi: "Belirlenemedi",
  kategori: "bilinmeyen",
  icerik_kaynagi: "tahmin",
  guven_duzeyi: "düşük",
  maddeler: [],
  genel_ozet: "Ürün tipi anlaşılamadı; madde üretilmedi.",
  uyarilar: ["Daha net bir etiket fotoğrafı gerekli."],
};

describe("AnalysisResult", () => {
  it("accepts a complete label and an unknown estimate with no ingredients", () => {
    expect(AnalysisResultSchema.parse(labelResult)).toEqual(labelResult);
    expect(AnalysisResultSchema.parse(unknownEstimate)).toEqual(unknownEstimate);
  });
  it.each(["avoid", "caution", "none"])("accepts class %s", (sinif) => {
    expect(AnalysisResultSchema.safeParse({ ...labelResult, maddeler: [{ ...labelResult.maddeler[0], sinif }] }).success).toBe(true);
  });
  it.each(["", "   ", undefined])("rejects empty or missing reasons (%s)", (gerekce) => {
    const result = AnalysisResultSchema.safeParse({ ...labelResult, maddeler: [{ ...labelResult.maddeler[0], gerekce }] });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues[0].path).toEqual(["maddeler", 0, "gerekce"]);
  });
  it.each(["other", undefined])("rejects invalid or missing classes (%s)", (sinif) => {
    expect(AnalysisResultSchema.safeParse({ ...labelResult, maddeler: [{ ...labelResult.maddeler[0], sinif }] }).success).toBe(false);
  });
  it.each(["kategori", "icerik_kaynagi", "guven_duzeyi"])("rejects unknown %s values", (field) => {
    expect(AnalysisResultSchema.safeParse({ ...labelResult, [field]: "invalid" }).success).toBe(false);
  });
});
