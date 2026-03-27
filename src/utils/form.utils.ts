import type { UserState } from "../types/users.types";
import type { InputFieldConfig } from "../types/forms.types";
import type { UserKey } from "../utils/user.utils";

import { getUserValue } from "../utils/user.utils";

function createInitialState<T extends Record<string, string>>(
  fields: readonly InputFieldConfig[],
  user: UserState | null,
): T {
  const entries = fields.map((f) => {
    const userValue = user ? getUserValue(user, f.id as UserKey) : undefined;
    const normalizedValue =
      userValue === undefined || userValue === null ? "" : String(userValue);
    return [f.id, normalizedValue];
  });

  return Object.fromEntries(entries) as T;
}

function clampNumber(input: HTMLInputElement, rawValue: string): string {
  if (rawValue.trim() === "") return rawValue;

  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed)) return rawValue;

  let normalized = parsed;

  if (input.min !== "") normalized = Math.max(normalized, Number(input.min));
  if (input.max !== "") normalized = Math.min(normalized, Number(input.max));

  return String(normalized);
}

export { createInitialState, clampNumber };
