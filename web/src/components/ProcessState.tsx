"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Action } from "./Action";

export type ProcessStateProps = {
  variant: "loading" | "empty" | "error" | "rateLimit";
  title?: string; description?: string; retryAfterSeconds?: number; onRetry?: () => void;
};

function Countdown({ seconds, onRetry }: { seconds: number; onRetry?: () => void }) {
  const [remaining, setRemaining] = useState(() => Math.max(0, Math.ceil(seconds)));
  useEffect(() => {
    const interval = setInterval(() => setRemaining(value => Math.max(0, value - 1)), 1000);
    return () => clearInterval(interval);
  }, []);
  return <>
    <p className="muted" role="status">{remaining > 0 ? `Yeniden denemek için ${remaining} saniye bekleyin.` : "Şimdi yeniden deneyebilirsiniz."}</p>
    <Action disabled={remaining > 0} disabledReason={remaining > 0 ? "Bekleme süresi dolunca yeniden deneyebilirsiniz." : undefined} onClick={onRetry}>Yeniden dene</Action>
  </>;
}

export function ProcessState({ variant, title, description, retryAfterSeconds = 0, onRetry }: ProcessStateProps) {
  const titles = { loading: "Etiket okunuyor…", empty: "Henüz kaydedilmiş analiz yok.", error: "Bir fotoğraf daha deneyelim.", rateLimit: "Kullanım sınırına ulaştınız." };
  return <section className={`state card stack ${variant === "empty" ? "empty" : variant === "error" ? "error-state" : ""}`} aria-label={title ?? titles[variant]}>
    <span className="state-icon" aria-hidden="true">{variant === "loading" ? "…" : variant === "empty" ? "+" : "!"}</span>
    <h2>{title ?? titles[variant]}</h2>
    {description && <p className="muted">{description}</p>}
    {variant === "loading" && <div role="status" className="stack tight"><p>İçerikler belirleniyor ve değerlendirme hazırlanıyor.</p><progress aria-label="Analiz hazırlanıyor" /><p className="help">Bu işlem biraz zaman alabilir. Lütfen bekleyin.</p></div>}
    {variant === "empty" && <Link className="action action-filled touch-target" href="/">Yeni analiz</Link>}
    {variant === "error" && <><p>Etiket okunamadı, daha yakından ve ışıklı ortamda tekrar çek.</p><Action onClick={onRetry}>Yeniden fotoğraf çek</Action></>}
    {variant === "rateLimit" && <Countdown key={retryAfterSeconds} seconds={retryAfterSeconds} onRetry={onRetry} />}
  </section>;
}
