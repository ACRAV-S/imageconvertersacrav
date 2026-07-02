export function calculateAge(birthDate: Date): { years: number; months: number; days: number; totalDays: number } {
  const now = new Date();
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();
  if (days < 0) { months--; const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); days += prevMonth.getDate(); }
  if (months < 0) { years--; months += 12; }
  const totalDays = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  return { years, months, days, totalDays };
}

export function calculateBMI(weight: number, height: number, unit: "metric" | "imperial"): { bmi: number; category: string } {
  let bmi: number;
  if (unit === "metric") bmi = weight / ((height / 100) * (height / 100));
  else bmi = (weight / (height * height)) * 703;
  const rounded = Math.round(bmi * 10) / 10;
  let category: string;
  if (rounded < 18.5) category = "Underweight";
  else if (rounded < 25) category = "Normal";
  else if (rounded < 30) category = "Overweight";
  else category = "Obese";
  return { bmi: rounded, category };
}

export function calculatePercentage(value: number, percent: number): { result: number; percentOf: number } {
  return { result: (value * percent) / 100, percentOf: (percent / 100) * value };
}

export function calculatePercentageChange(oldValue: number, newValue: number): { change: number; percentChange: number } {
  const change = newValue - oldValue;
  const percentChange = oldValue !== 0 ? (change / oldValue) * 100 : 0;
  return { change: Math.round(change * 100) / 100, percentChange: Math.round(percentChange * 100) / 100 };
}

export function calculateGst(amount: number, rate: number): { gst: number; total: number; baseAmount: number } {
  const gst = (amount * rate) / (100 + rate);
  const baseAmount = amount - gst;
  return { gst: Math.round(gst * 100) / 100, total: amount, baseAmount: Math.round(baseAmount * 100) / 100 };
}

export function calculateDiscount(price: number, discountPercent: number): { savings: number; finalPrice: number; discountPercent: number } {
  const savings = (price * discountPercent) / 100;
  return { savings: Math.round(savings * 100) / 100, finalPrice: Math.round((price - savings) * 100) / 100, discountPercent };
}

export function calculateEmi(principal: number, annualRate: number, months: number): { emi: number; totalInterest: number; totalPayment: number } {
  if (annualRate === 0) {
    const emi = principal / months;
    return { emi: Math.round(emi * 100) / 100, totalInterest: 0, totalPayment: principal };
  }
  const monthlyRate = annualRate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = emi * months;
  return {
    emi: Math.round(emi * 100) / 100,
    totalInterest: Math.round((totalPayment - principal) * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
  };
}

export function calculateLoan(principal: number, annualRate: number, years: number): { monthlyPayment: number; totalInterest: number; totalPayment: number } {
  const months = years * 12;
  if (annualRate === 0) {
    const monthly = principal / months;
    return { monthlyPayment: Math.round(monthly * 100) / 100, totalInterest: 0, totalPayment: principal };
  }
  const monthlyRate = annualRate / 12 / 100;
  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = monthlyPayment * months;
  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round((totalPayment - principal) * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
  };
}

export function calculateDateDiff(date1: Date, date2: Date): { years: number; months: number; days: number; totalDays: number; weeks: number; hours: number } {
  const start = new Date(Math.min(date1.getTime(), date2.getTime()));
  const end = new Date(Math.max(date1.getTime(), date2.getTime()));
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) { months--; const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0); days += prevMonth.getDate(); }
  if (months < 0) { years--; months += 12; }
  const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return { years, months, days, totalDays, weeks: Math.floor(totalDays / 7), hours: totalDays * 24 };
}

export function calculateTimeDuration(startTime: string, endTime: string): { hours: number; minutes: number; seconds: number; totalMinutes: number } | null {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) return null;
  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;
  let diff = endMin - startMin;
  if (diff < 0) diff += 24 * 60;
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return { hours, minutes, seconds: 0, totalMinutes: diff };
}

export function calculateTip(bill: number, tipPercent: number, split: number): { tip: number; total: number; perPerson: number } {
  const tip = (bill * tipPercent) / 100;
  const total = bill + tip;
  return {
    tip: Math.round(tip * 100) / 100,
    total: Math.round(total * 100) / 100,
    perPerson: Math.round((total / split) * 100) / 100,
  };
}

export function calculateFuelCost(distance: number, mileage: number, pricePerLiter: number): { fuelNeeded: number; cost: number } {
  const fuelNeeded = distance / mileage;
  return {
    fuelNeeded: Math.round(fuelNeeded * 100) / 100,
    cost: Math.round(fuelNeeded * pricePerLiter * 100) / 100,
  };
}

export function calculateSimpleInterest(principal: number, rate: number, time: number): { interest: number; total: number } {
  const interest = (principal * rate * time) / 100;
  return { interest: Math.round(interest * 100) / 100, total: Math.round((principal + interest) * 100) / 100 };
}

export type UnitCategory = "length" | "weight" | "temperature" | "area" | "volume" | "speed" | "time" | "data";

interface UnitDef { label: string; toBase: (v: number) => number; fromBase: (v: number) => number; }

const UNIT_DEFS: Record<UnitCategory, Record<string, UnitDef>> = {
  length: {
    mm: { label: "Millimeter", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    cm: { label: "Centimeter", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    m: { label: "Meter", toBase: (v) => v, fromBase: (v) => v },
    km: { label: "Kilometer", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    in: { label: "Inch", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ft: { label: "Foot", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    yd: { label: "Yard", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    mi: { label: "Mile", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  },
  weight: {
    mg: { label: "Milligram", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
    g: { label: "Gram", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    kg: { label: "Kilogram", toBase: (v) => v, fromBase: (v) => v },
    t: { label: "Tonne", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    oz: { label: "Ounce", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    lb: { label: "Pound", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
  },
  temperature: {
    c: { label: "Celsius", toBase: (v) => v, fromBase: (v) => v },
    f: { label: "Fahrenheit", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => (v * 9 / 5) + 32 },
    k: { label: "Kelvin", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  },
  area: {
    sqmm: { label: "Sq Millimeter", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
    sqcm: { label: "Sq Centimeter", toBase: (v) => v / 10000, fromBase: (v) => v * 10000 },
    sqm: { label: "Sq Meter", toBase: (v) => v, fromBase: (v) => v },
    sqkm: { label: "Sq Kilometer", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
    ha: { label: "Hectare", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    acre: { label: "Acre", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    sqft: { label: "Sq Foot", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
  },
  volume: {
    ml: { label: "Milliliter", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    l: { label: "Liter", toBase: (v) => v, fromBase: (v) => v },
    gal: { label: "Gallon (US)", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
    qt: { label: "Quart", toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
    cup: { label: "Cup", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
    floz: { label: "Fluid Ounce", toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
  },
  speed: {
    mps: { label: "Meter/sec", toBase: (v) => v, fromBase: (v) => v },
    kph: { label: "km/h", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    mph: { label: "mph", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
    knot: { label: "Knot", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
  },
  time: {
    ms: { label: "Millisecond", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    s: { label: "Second", toBase: (v) => v, fromBase: (v) => v },
    min: { label: "Minute", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
    h: { label: "Hour", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
    d: { label: "Day", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
  },
  data: {
    b: { label: "Byte", toBase: (v) => v, fromBase: (v) => v },
    kb: { label: "Kilobyte", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
    mb: { label: "Megabyte", toBase: (v) => v * 1024 * 1024, fromBase: (v) => v / (1024 * 1024) },
    gb: { label: "Gigabyte", toBase: (v) => v * 1024 * 1024 * 1024, fromBase: (v) => v / (1024 * 1024 * 1024) },
    tb: { label: "Terabyte", toBase: (v) => v * 1024 * 1024 * 1024 * 1024, fromBase: (v) => v / (1024 * 1024 * 1024 * 1024) },
  },
};

export function getUnitCategories(): UnitCategory[] {
  return Object.keys(UNIT_DEFS) as UnitCategory[];
}

export function getUnitsForCategory(category: UnitCategory): { key: string; label: string }[] {
  return Object.entries(UNIT_DEFS[category] || {}).map(([key, def]) => ({ key, label: def.label }));
}

export function convertUnit(value: number, from: string, to: string, category: UnitCategory): number | null {
  const defs = UNIT_DEFS[category];
  if (!defs || !defs[from] || !defs[to]) return null;
  const baseValue = defs[from].toBase(value);
  return defs[to].fromBase(baseValue);
}

export function binaryAdd(a: string, b: string): string {
  const sum = parseInt(a, 2) + parseInt(b, 2);
  return sum.toString(2);
}

export function binarySubtract(a: string, b: string): string {
  const diff = parseInt(a, 2) - parseInt(b, 2);
  return diff >= 0 ? diff.toString(2) : "-" + Math.abs(diff).toString(2);
}

export function binaryMultiply(a: string, b: string): string {
  return (parseInt(a, 2) * parseInt(b, 2)).toString(2);
}

export function binaryDivide(a: string, b: string): { quotient: string; remainder: string } | null {
  const numA = parseInt(a, 2);
  const numB = parseInt(b, 2);
  if (numB === 0) return null;
  return { quotient: Math.floor(numA / numB).toString(2), remainder: (numA % numB).toString(2) };
}

export function binaryAnd(a: string, b: string): string {
  return (parseInt(a, 2) & parseInt(b, 2)).toString(2);
}

export function binaryOr(a: string, b: string): string {
  return (parseInt(a, 2) | parseInt(b, 2)).toString(2);
}

export function binaryXor(a: string, b: string): string {
  return (parseInt(a, 2) ^ parseInt(b, 2)).toString(2);
}

export function isValidBinary(s: string): boolean {
  return /^[01]+$/.test(s);
}
