export function formatWifiQr(
  ssid: string,
  password: string,
  encryption: "WPA" | "WEP" | "None"
): string {
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/"/g, '\\"');
  return `WIFI:T:${encryption};S:${esc(ssid)};P:${esc(password)};;`;
}

export function formatEmailQr(
  email: string,
  subject: string,
  body: string
): string {
  const enc = (s: string) => encodeURIComponent(s);
  let qr = `mailto:${enc(email)}`;
  const params: string[] = [];
  if (subject) params.push(`subject=${enc(subject)}`);
  if (body) params.push(`body=${enc(body)}`);
  if (params.length) qr += `?${params.join("&")}`;
  return qr;
}

export function formatSmsQr(number: string, message: string): string {
  return `SMSTO:${number}:${message}`;
}

export function formatWhatsAppQr(phone: string, message: string): string {
  const clean = phone.replace(/[^0-9]/g, "");
  const url = `https://wa.me/${clean}`;
  if (message) return `${url}?text=${encodeURIComponent(message)}`;
  return url;
}

export function formatVCardQr(fields: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  org: string;
  title: string;
  url: string;
  address: string;
}): string {
  const lines: string[] = ["BEGIN:VCARD", "VERSION:3.0"];
  if (fields.firstName || fields.lastName) {
    lines.push(`FN:${fields.firstName} ${fields.lastName}`);
    lines.push(`N:${fields.lastName};${fields.firstName};;;`);
  }
  if (fields.phone) lines.push(`TEL:${fields.phone}`);
  if (fields.email) lines.push(`EMAIL:${fields.email}`);
  if (fields.org) lines.push(`ORG:${fields.org}`);
  if (fields.title) lines.push(`TITLE:${fields.title}`);
  if (fields.url) lines.push(`URL:${fields.url}`);
  if (fields.address) lines.push(`ADR:;;${fields.address};;;`);
  lines.push("END:VCARD");
  return lines.join("\n");
}

export function formatLocationQr(lat: string, lon: string): string {
  return `geo:${lat},${lon}`;
}

export function formatEventQr(fields: {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
}): string {
  const fmt = (d: string) => d.replace(/[-:]/g, "").replace("T", "T").split(".")[0] + "Z";
  const lines: string[] = ["BEGIN:VEVENT", "VERSION:2.0"];
  if (fields.title) lines.push(`SUMMARY:${fields.title}`);
  if (fields.description) lines.push(`DESCRIPTION:${fields.description}`);
  if (fields.location) lines.push(`LOCATION:${fields.location}`);
  if (fields.startDate) lines.push(`DTSTART:${fmt(fields.startDate)}`);
  if (fields.endDate) lines.push(`DTEND:${fmt(fields.endDate)}`);
  lines.push("END:VEVENT");
  return lines.join("\n");
}
