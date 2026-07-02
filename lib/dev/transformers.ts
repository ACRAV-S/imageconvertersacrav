export interface JsonResult { ok: boolean; data?: unknown; error?: string }

export function parseJson(input: string): JsonResult {
  try {
    const data = JSON.parse(input);
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export function formatJson(input: string): string {
  const { ok, data, error } = parseJson(input);
  if (!ok) throw new Error(error);
  return JSON.stringify(data, null, 2);
}

export function validateJson(input: string): JsonResult {
  return parseJson(input);
}

export function minifyJson(input: string): string {
  const { ok, data, error } = parseJson(input);
  if (!ok) throw new Error(error);
  return JSON.stringify(data);
}

export function beautifyJson(input: string): string {
  return formatJson(input);
}

export function encodeBase64(input: string): string {
  return btoa(unescape(encodeURIComponent(input)));
}

export function decodeBase64(input: string): string {
  try {
    return decodeURIComponent(escape(atob(input)));
  } catch {
    throw new Error("Invalid Base64 input");
  }
}

export function encodeUrl(input: string): string {
  return encodeURIComponent(input);
}

export function decodeUrl(input: string): string {
  return decodeURIComponent(input);
}

export interface JwtParts {
  header: string;
  payload: string;
  signature: string;
  headerParsed: string;
  payloadParsed: string;
}

export function decodeJwt(input: string): JwtParts {
  const parts = input.trim().split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT: expected 3 dot-separated parts");

  const decodePart = (s: string): string => {
    try {
      const padded = s.replace(/-/g, "+").replace(/_/g, "/");
      const p = padded.padEnd(padded.length + (4 - (padded.length % 4)) % 4, "=");
      return decodeURIComponent(escape(atob(p)));
    } catch {
      throw new Error("Invalid Base64 encoding in JWT part");
    }
  };

  let headerParsed: string;
  let payloadParsed: string;
  try {
    headerParsed = formatJson(decodePart(parts[0]));
    payloadParsed = formatJson(decodePart(parts[1]));
  } catch (e) {
    throw new Error(`Failed to decode JWT: ${(e as Error).message}`);
  }

  return {
    header: decodePart(parts[0]),
    payload: decodePart(parts[1]),
    signature: parts[2],
    headerParsed,
    payloadParsed,
  };
}

export function formatHtml(input: string): string {
  const voidEls = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
  ]);
  let depth = 0;
  const out: string[] = [];
  const tokens = input.replace(/>\s*</g, ">\n<").split("\n");
  for (const token of tokens) {
    const trimmed = token.trim();
    if (!trimmed) continue;
    const isClose = /^<\//.test(trimmed);
    const isOpen = /^<[^/][^>]*[^/]>$/.test(trimmed) || /^<[^/][^>]*>$/.test(trimmed);
    const tag = trimmed.match(/^<\/?(\w+)/)?.[1] ?? "";
    const isVoid = voidEls.has(tag) || /\/>$/.test(trimmed);
    const isComment = /^<!--/.test(trimmed);
    if (isClose) depth--;
    const indent = "  ".repeat(Math.max(0, depth));
    out.push(indent + trimmed);
    if ((isOpen && !isVoid && !isClose) || isComment) depth++;
  }
  return out.join("\n");
}

export function formatCss(input: string): string {
  let depth = 0;
  const out: string[] = [];
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === "{") {
      out.push(ch);
      depth++;
      out.push("\n");
    } else if (ch === "}") {
      depth--;
      out.push("\n" + "  ".repeat(depth) + ch);
    } else if (ch === ";") {
      out.push(ch + "\n" + "  ".repeat(depth));
    } else {
      out.push(ch);
    }
  }
  return out.join("").replace(/\n{3,}/g, "\n\n").trim();
}

export function formatJs(input: string): string {
  let depth = 0;
  let inString = false;
  let stringChar = "";
  const out: string[] = [];
  let buffer = "";
  const flushBuffer = () => {
    if (buffer.trim()) {
      out.push("  ".repeat(depth) + buffer.trim() + "\n");
    }
    buffer = "";
  };
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (inString) {
      buffer += ch;
      if (ch === "\\") { buffer += input[++i] || ""; continue; }
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      buffer += ch;
      inString = true;
      stringChar = ch;
      continue;
    }
    if (ch === "{" || ch === "[") {
      flushBuffer();
      out.push("  ".repeat(depth) + ch + "\n");
      depth++;
    } else if (ch === "}" || ch === "]") {
      flushBuffer();
      depth--;
      out.push("  ".repeat(depth) + ch + "\n");
    } else if (ch === ";") {
      buffer += ch;
      flushBuffer();
    } else if (ch === "\n" || ch === "\r") {
      flushBuffer();
    } else {
      buffer += ch;
    }
  }
  flushBuffer();
  return out.join("").replace(/\n{3,}/g, "\n\n").trim();
}
