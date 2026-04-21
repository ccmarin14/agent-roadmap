export type HourRange = {
  readonly minHours: number;
  readonly maxHours: number;
};

export type DurationHoursOptions = {
  /** Horas de estudio por semana asumidas para convertir semanas/meses a horas. */
  readonly hoursPerWeek: number;
  /** Semanas por mes para convertir rangos en meses a semanas. */
  readonly weeksPerMonth: number;
};

const DEFAULT_OPTIONS: DurationHoursOptions = {
  hoursPerWeek: 5,
  weeksPerMonth: 4,
};

const DASH_REGEX = /[-–—]/g;

function normalizeDuration(input: string): string {
  return input.trim().toLowerCase().replace(DASH_REGEX, "–");
}

function parseRangeNumbers(input: string): { min: number; max: number } | null {
  // Busca el primer rango numérico tipo "1–2" (con dash normalizado).
  const m = input.match(/(\d+(?:\.\d+)?)\s*–\s*(\d+(?:\.\d+)?)/);
  if (!m) return null;

  const min = Number(m[1]);
  const max = Number(m[2]);
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  if (min <= 0 || max <= 0 || max < min) return null;

  return { min, max };
}

export function parseDurationToHourRange(duration: string, opts?: Partial<DurationHoursOptions>): HourRange | null {
  const options: DurationHoursOptions = { ...DEFAULT_OPTIONS, ...opts };
  if (options.hoursPerWeek <= 0 || options.weeksPerMonth <= 0) return null;

  const d = normalizeDuration(duration);
  const range = parseRangeNumbers(d);
  if (!range) return null;

  const isWeeks = d.includes("semana");
  const isMonths = d.includes("mes");

  if (!isWeeks && !isMonths) return null;

  const minWeeks = isMonths ? range.min * options.weeksPerMonth : range.min;
  const maxWeeks = isMonths ? range.max * options.weeksPerMonth : range.max;

  const minHours = Math.round(minWeeks * options.hoursPerWeek);
  const maxHours = Math.round(maxWeeks * options.hoursPerWeek);

  if (minHours <= 0 || maxHours <= 0 || maxHours < minHours) return null;

  return { minHours, maxHours };
}

export function formatHourRange(range: HourRange): string {
  return `${range.minHours}–${range.maxHours} h`;
}

