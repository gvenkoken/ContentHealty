"use client";

import { useId, type InputHTMLAttributes } from "react";

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; help?: string; error?: string };
export function InputField({ label, help, error, id, ...props }: InputFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const describedBy = [props["aria-describedby"], help && `${fieldId}-help`, error && `${fieldId}-error`].filter(Boolean).join(" ");
  return <div className="field">
    <label htmlFor={fieldId}>{label}</label>
    <input {...props} id={fieldId} aria-invalid={error ? true : props["aria-invalid"]} aria-describedby={describedBy || undefined} />
    {help && <p className="help" id={`${fieldId}-help`}>{help}</p>}
    {error && <p className="field-error" id={`${fieldId}-error`}>{error}</p>}
  </div>;
}
