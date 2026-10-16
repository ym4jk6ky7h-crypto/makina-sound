export function normalize(value: string): string {
  return value
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function includesQuery(query: string, parts: string[]): boolean {
  const needle = normalize(query.trim());
  if (!needle) return true;
  return parts.some((part) => normalize(part).includes(needle));
}
