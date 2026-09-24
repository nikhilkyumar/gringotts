export function formatIndianNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "";
  }

  return Math.round(value).toLocaleString("en-IN");
}

export function parseIndianNumber(value: string): number {
  const cleaned = value.replace(/,/g, "");

  if (cleaned === "") {
    return 0;
  }

  const number = Number(cleaned);

  return Number.isFinite(number) ? number : 0;
}