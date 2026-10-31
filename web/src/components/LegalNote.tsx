export const legalText = "Bu bilgiler genel bilgilendirme amaçlıdır, tıbbi tavsiye değildir. Alerji veya sağlık durumunuz varsa uzmana danışın.";

export function LegalNote() {
  return <aside className="legal" aria-label="Bilgilendirme sınırları"><strong>Bilgilendirme notu</strong><p>{legalText}</p></aside>;
}
