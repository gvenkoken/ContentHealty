"use client";

import { useId, type ButtonHTMLAttributes } from "react";

export type ActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "filled" | "outlined" | "text";
  disabledReason?: string;
};

export function Action({ variant = "filled", disabledReason, children, className = "", ...props }: ActionProps) {
  const id = useId();
  const description = [props["aria-describedby"], props.disabled && disabledReason ? id : undefined].filter(Boolean).join(" ");
  return <>
    <button {...props} type={props.type ?? "button"} aria-describedby={description || undefined}
      className={`action touch-target action-${variant} ${className}`}>{children}</button>
    {props.disabled && disabledReason && <p id={id} className="help">{disabledReason}</p>}
  </>;
}
