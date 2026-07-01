export interface WordCountResult {
  words: number;
  uniqueWords: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: number;
  speakingTime: number;
  longestWord: string;
  shortestWord: string;
  averageWordLength: string;
}

export function countWords(text: string): WordCountResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      words: 0, uniqueWords: 0, characters: 0, charactersNoSpaces: 0,
      sentences: 0, paragraphs: 0, lines: 0,
      readingTime: 0, speakingTime: 0,
      longestWord: "-", shortestWord: "-", averageWordLength: "0",
    };
  }

  const words = trimmed.split(/\s+/);
  const uniqueWordsSet = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z0-9'-]/g, "")));
  uniqueWordsSet.delete("");
  const uniqueWords = uniqueWordsSet.size;

  const characters = trimmed.length;
  const charactersNoSpaces = trimmed.replace(/\s/g, "").length;

  const sentences = (trimmed.match(/[.!?]+/g) || []).length || (trimmed.length > 0 ? 1 : 0);

  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || (trimmed.length > 0 ? 1 : 0);

  const lines = trimmed.split("\n").filter((l) => l.trim().length > 0).length || 1;

  const wordCount = words.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 238));
  const speakingTime = Math.max(1, Math.ceil(wordCount / 183));

  const cleanWords = words.map((w) => w.replace(/[^a-z0-9'-]/gi, "")).filter((w) => w.length > 0);
  const longestWord = cleanWords.length > 0 ? cleanWords.reduce((a, b) => (a.length >= b.length ? a : b)) : "-";
  const shortestWord = cleanWords.length > 0 ? cleanWords.reduce((a, b) => (a.length <= b.length ? a : b)) : "-";
  const avgLen = cleanWords.length > 0 ? (cleanWords.reduce((s, w) => s + w.length, 0) / cleanWords.length) : 0;

  return {
    words: wordCount,
    uniqueWords,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    lines,
    readingTime,
    speakingTime,
    longestWord,
    shortestWord,
    averageWordLength: avgLen.toFixed(1),
  };
}

export function countCharacters(text: string) {
  const trimmed = text;
  const withSpaces = trimmed.length;
  const withoutSpaces = trimmed.replace(/\s/g, "").length;
  const letters = (trimmed.match(/[a-zA-Z]/g) || []).length;
  const digits = (trimmed.match(/[0-9]/g) || []).length;
  const spaces = (trimmed.match(/\s/g) || []).length;
  const specialChars = withSpaces - letters - digits - spaces;
  return { withSpaces, withoutSpaces, letters, digits, spaces, specialChars };
}

export function countSentences(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return { total: 0, shortest: "-", longest: "-", average: "0" };
  const sentences = trimmed.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 0);
  if (sentences.length === 0) return { total: 0, shortest: "-", longest: "-", average: "0" };
  const lengths = sentences.map((s) => s.split(/\s+/).length);
  const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  return {
    total: sentences.length,
    shortest: `${Math.min(...lengths)} words`,
    longest: `${Math.max(...lengths)} words`,
    average: avg.toFixed(1),
  };
}

export function countParagraphs(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return { total: 0, emptyLines: 0, avgLength: "0" };
  const lines = trimmed.split("\n");
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const emptyLines = lines.filter((l) => l.trim().length === 0).length;
  const avgChars = paragraphs.length > 0
    ? paragraphs.reduce((s, p) => s + p.trim().length, 0) / paragraphs.length
    : 0;
  return { total: paragraphs.length || 1, emptyLines, avgLength: avgChars.toFixed(0) };
}

export function calculateReadingTime(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return { readingTime: 0, speakingTime: 0, wordCount: 0 };
  const words = trimmed.split(/\s+/).length;
  return {
    readingTime: Math.max(1, Math.ceil(words / 238)),
    speakingTime: Math.max(1, Math.ceil(words / 183)),
    wordCount: words,
  };
}

export type CaseType = "lower" | "upper" | "title" | "sentence" | "camel" | "pascal" | "snake" | "kebab";

export function convertCase(text: string, caseType: CaseType): string {
  switch (caseType) {
    case "lower":
      return text.toLowerCase();
    case "upper":
      return text.toUpperCase();
    case "title":
      return text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    case "sentence":
      return text
        .toLowerCase()
        .replace(/(?:^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    case "camel":
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+(\w)/g, (_, c) => c.toUpperCase());
    case "pascal":
      return text
        .replace(/[^a-zA-Z0-9]+(\w?)/g, (_, c) => c.toUpperCase())
        .replace(/^(\w)/, (c) => c.toUpperCase());
    case "snake":
      return text
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_]/g, "")
        .toLowerCase();
    case "kebab":
      return text
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "")
        .toLowerCase();
  }
}

export function removeDuplicateLines(text: string): string {
  const lines = text.split("\n");
  const seen = new Set<string>();
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!seen.has(trimmed)) {
      seen.add(trimmed);
      result.push(line);
    }
  }
  return result.join("\n");
}

export function sortLines(text: string, direction: "asc" | "desc"): string {
  const lines = text.split("\n");
  const sorted = [...lines].sort((a, b) => {
    const cmp = a.localeCompare(b);
    return direction === "asc" ? cmp : -cmp;
  });
  return sorted.join("\n");
}

export function reverseText(text: string, mode: "chars" | "words" | "lines"): string {
  switch (mode) {
    case "chars":
      return text.split("").reverse().join("");
    case "words":
      return text.split(/\s+/).reverse().join(" ");
    case "lines":
      return text.split("\n").reverse().join("\n");
  }
}

export function removeExtraSpaces(text: string): string {
  return text
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\s+|\s+$/gm, "")
    .trim();
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateLoremIpsum(
  type: "words" | "sentences" | "paragraphs",
  count: number
): string {
  const lorem =
    "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const words = lorem.replace(/\./g, "").split(/\s+/);

  switch (type) {
    case "words": {
      const result: string[] = [];
      for (let i = 0; i < count; i++) {
        result.push(words[i % words.length]);
      }
      return result.join(" ");
    }
    case "sentences": {
      const sentenceWords = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        "Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
        "In voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
        "Deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste.",
        "Natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
        "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.",
        "Vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.",
      ];
      const result: string[] = [];
      for (let i = 0; i < count; i++) {
        result.push(sentenceWords[i % sentenceWords.length]);
      }
      return result.join(" ");
    }
    case "paragraphs": {
      const paraSentences = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
        "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
      ];
      const result: string[] = [];
      for (let i = 0; i < count; i++) {
        result.push(paraSentences[i % paraSentences.length]);
      }
      return result.join("\n\n");
    }
  }
}

export function generateRandomString(
  length: number,
  options: {
    uppercase: boolean;
    lowercase: boolean;
    digits: boolean;
    symbols: boolean;
  }
): string {
  let chars = "";
  if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
  if (options.digits) chars += "0123456789";
  if (options.symbols) chars += "!@#$%^&*()_-+=<>?/{}~";

  if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }
  return result;
}

export function convertUnicode(
  text: string,
  direction: "encode" | "decode"
): string {
  if (direction === "encode") {
    let result = "";
    for (const char of text) {
      const code = char.charCodeAt(0);
      if (code > 127 || char === "\\") {
        result += `\\u${code.toString(16).padStart(4, "0")}`;
      } else {
        result += char;
      }
    }
    return result;
  } else {
    return text.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
  }
}

export interface DiffLine {
  type: "unchanged" | "added" | "removed";
  text: string;
}

export function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  const result: DiffLine[] = [];
  const maxLen = Math.max(oldLines.length, newLines.length);

  for (let i = 0; i < maxLen; i++) {
    if (i >= oldLines.length) {
      result.push({ type: "added", text: newLines[i] });
    } else if (i >= newLines.length) {
      result.push({ type: "removed", text: oldLines[i] });
    } else if (oldLines[i] === newLines[i]) {
      result.push({ type: "unchanged", text: oldLines[i] });
    } else {
      result.push({ type: "removed", text: oldLines[i] });
      result.push({ type: "added", text: newLines[i] });
    }
  }

  return result;
}
