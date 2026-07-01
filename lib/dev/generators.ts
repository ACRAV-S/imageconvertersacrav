export function generateUuid(): string {
  return crypto.randomUUID();
}

export function generateUuids(count: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) result.push(crypto.randomUUID());
  return result;
}

export async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const hex = Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hex;
}
