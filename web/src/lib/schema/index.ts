import { z } from "zod";

const text = z.string().trim().min(1);
export const IngredientClassSchema = z.enum(["avoid", "caution", "none"]);
export const ProductCategorySchema = z.enum([
  "gıda", "takviye", "temizlik", "kişisel bakım", "bilinmeyen",
]);
export const IngredientSchema = z.object({
  ad: text,
  e_kodu: z.string().regex(/^E\d{3,4}[a-z]?$/).optional(),
  sinif: IngredientClassSchema,
  gerekce: text,
  belirsizlik: text.optional(),
  ilgili_gruplar: z.array(text),
}).strict();
export const AnalysisResultSchema = z.object({
  urun_adi: text,
  kategori: ProductCategorySchema,
  icerik_kaynagi: z.enum(["etiket", "tahmin"]),
  guven_duzeyi: z.enum(["yüksek", "orta", "düşük"]),
  maddeler: z.array(IngredientSchema),
  genel_ozet: text,
  uyarilar: z.array(text),
}).strict();

export type IngredientClass = z.infer<typeof IngredientClassSchema>;
export type ProductCategory = z.infer<typeof ProductCategorySchema>;
export type Ingredient = z.infer<typeof IngredientSchema>;
export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
