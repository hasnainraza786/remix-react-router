import { format } from "date-fns";

export const toBoolean = (
  value: string | boolean | null | undefined
): boolean => {
  if (value === undefined || value === null) return false; // keep undefined/null if needed
  if (typeof value === "boolean") return value; // already boolean
  if (typeof value === "string") return value.toLowerCase() === "true"; // check string
  return false; // fallback
};
export const formattedDate = (date: string) => {
  if (!date) return "N/A";
  return format(date, "dd/MM/yy");
};
export function getSafeValue<T>(value: T | null | undefined): string | T {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }
  return value;
}
export const stopPropagation = (fn: () => void) => (e: React.MouseEvent) => {
  e.stopPropagation();
  fn();
};
