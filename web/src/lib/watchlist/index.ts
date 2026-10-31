import { z } from "zod";
import data from "../../../config/ingredients-watchlist.json";
import { IngredientClassSchema, ProductCategorySchema } from "../schema";

const text = z.string().trim().min(1);
export const WatchlistEntrySchema = z.object({
  ad: text,
  e_kodu: z.string().regex(/^E\d{3,4}[a-z]?$/).nullable(),
  esanlamlilar: z.array(text),
  varsayilan_sinif: IngredientClassSchema,
  kategori_siniflari: z.record(ProductCategorySchema, IngredientClassSchema),
  neden: text,
  kaynak: text,
  son_kontrol: z.string().date(),
}).strict();
export const WatchlistSchema = z.array(WatchlistEntrySchema).min(1);
export type WatchlistEntry = z.infer<typeof WatchlistEntrySchema>;
export type Watchlist = z.infer<typeof WatchlistSchema>;

/** Accepts JSON text or decoded data so callers can supply another source. */
export function loadWatchlist(input: unknown = data): Watchlist {
  let decoded: unknown = input;
  if (typeof input === "string") {
    try {
      decoded = JSON.parse(input);
    } catch {
      throw new Error("Referans listesi yüklenemedi: geçersiz JSON.");
    }
  }
  const result = WatchlistSchema.safeParse(decoded);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".") || "liste"}: ${issue.message}`)
      .join("; ");
    throw new Error(`Referans listesi doğrulanamadı: ${details}`);
  }
  return result.data;
}
