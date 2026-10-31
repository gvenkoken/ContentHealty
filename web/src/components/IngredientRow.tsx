"use client";

import { useId, useState } from "react";

export const ingredientClasses = {
  avoid: { label: "Kaçınılması önerilir", tone: "error" },
  caution: { label: "Dikkat", tone: "warning" },
  none: { label: "Risk yok", tone: "success" },
} as const;
export type IngredientClass = keyof typeof ingredientClasses;
export type IngredientRowProps = {
  name: string; classification: IngredientClass; reason: string;
  uncertainty: string; groups: readonly string[]; description?: string; defaultOpen?: boolean;
};
export function IngredientRow({ name, classification, reason, uncertainty, groups, description, defaultOpen = false }: IngredientRowProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const category = ingredientClasses[classification];
  return <article className="ingredient">
    <button className="ingredient-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} type="button">
      <span className="ingredient-name">{name}{description && <small className="muted">{description}</small>}</span>
      <span className={`badge ${category.tone}`}>{category.label}</span><span aria-hidden="true">{open ? "−" : "+"}</span>
    </button>
    <div id={id} hidden={!open} className="ingredient-body stack tight">
      <p>{reason}</p><p className="help">İlgili gruplar: {groups.length ? groups.join(", ") : "Belirtilmedi."}</p>
      <p className="help">{uncertainty}</p>
    </div>
  </article>;
}
