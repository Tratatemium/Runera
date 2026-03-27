function clampNumber(input: HTMLInputElement, rawValue: string): string {
  if (rawValue.trim() === "") return rawValue;

  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed)) return rawValue;

  let normalized = parsed;

  if (input.min !== "") normalized = Math.max(normalized, Number(input.min));
  if (input.max !== "") normalized = Math.min(normalized, Number(input.max));

  return String(normalized);
}

function normalizeValue(value: string | number | undefined): string {
  return value == null ? "" : String(value);
}

export { normalizeValue, clampNumber };
