export function serializeJsonLd(data: Record<string, unknown> | Record<string, unknown>[]): string {
  const serialized = JSON.stringify(data);
  if (serialized === undefined) return "null";
  return serialized.replace(/</g, "\\u003c");
}
