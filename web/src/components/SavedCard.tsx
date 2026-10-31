"use client";

import { Action } from "./Action";
import { Notice } from "./Notice";

type Shared = {
  name: string; category: string; summary: string; href: string; source: string; confidence: string;
  estimated?: boolean; counts: { avoid: number; caution: number; none: number };
};
export type SavedCardProps = Shared & (
  | { variant?: "saved"; date: string; dateTime?: string; onDelete: () => void }
  | { variant: "example"; date?: never; dateTime?: never; onDelete?: never }
);
export function SavedCard(props: SavedCardProps) {
  return <article className="card stack">
    <div className="row between"><span className="badge">{props.category}</span>
      {props.variant === "example" ? <span className="help">Örnek ürün</span> : <time className="help" dateTime={props.dateTime}>{props.date}</time>}
    </div>
    <h3>{props.name}</h3><p className="help">{props.source} · {props.confidence} güven</p>
    {props.estimated && <Notice variant="estimate" />}
    <p>{props.summary}</p>
    <div className="distribution" aria-label="Sınıf dağılımı">
      <span className="error">{props.counts.avoid} kaçınma</span>
      <span className="warning">{props.counts.caution} dikkat</span>
      <span className="success">{props.counts.none} risk yok</span>
    </div>
    <div className="row between"><a className="text-link touch-target" href={props.href}>Analizi aç →</a>
      {props.variant !== "example" && <Action variant="text" className="text-danger" aria-label={`${props.name} kaydını sil`} onClick={props.onDelete}>Sil</Action>}
    </div>
  </article>;
}
