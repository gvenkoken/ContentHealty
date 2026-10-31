"use client";

import { useState, type ReactNode } from "react";
import { Action } from "./Action";

type Base = { title?: string; children?: ReactNode };
export type NoticeProps = Base & (
  | { variant: "estimate"; uploadHref?: string; onDismiss?: never }
  | { variant: "warning" | "info" | "success" | "error"; onDismiss?: () => void; uploadHref?: never }
);
export function Notice(props: NoticeProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  const estimate = props.variant === "estimate";
  return <aside className={`notice ${estimate ? "warning" : props.variant}`} role={props.variant === "error" ? "alert" : "note"}>
    <span className="notice-symbol" aria-hidden="true">{props.variant === "info" ? "i" : "!"}</span>
    <div className="stack tight">
      <strong>{props.title ?? (estimate ? "Tahmini içerik – etiketten doğrulanmadı." : "Bilgilendirme")}</strong>
      {props.children ?? (estimate ? <p>İçerikler ürün adına göre tahmin edildi. Güven düzeyi en fazla ortadır.</p> : null)}
      {estimate && <a className="text-link" href={props.uploadHref ?? "/#icerik-fotografi"}>İçindekiler fotoğrafını yükle</a>}
    </div>
    {!estimate && props.onDismiss && <Action variant="text" aria-label="Bildirimi kapat" onClick={() => { setDismissed(true); props.onDismiss?.(); }}>×</Action>}
  </aside>;
}
