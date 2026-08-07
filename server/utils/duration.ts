const UNIT_SECONDS: Record<string, number> = {
  s: 1,
  m: 60,
  h: 3600,
  d: 86400,
};

export function durationToSeconds(value: string, fallbackSeconds = 7 * 86400): number {
  const match = /^(\d+)([smhd])$/.exec(value.trim());
  if (!match) return fallbackSeconds;
  const [, amount, unit] = match;
  return Number(amount) * UNIT_SECONDS[unit];
}
