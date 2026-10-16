import { LOCALE, type DayOfWeek, type OpeningHours } from '@/config/company';

// Opening hours as display rows: one row per entry, ordered by its first day, then one
// row with the closed days. Shared by the footer and the contact page.

export interface OpeningHoursRow {
  days: string; // "Martes y jueves"
  hours: string; // "2 p. m. – 7 p. m." or "Cerrado"
}

const WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Formatted in UTC on dates built in UTC, so the hour and the weekday stay as written.
const timeFormat = new Intl.DateTimeFormat(LOCALE, {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'UTC',
});
const hourFormat = new Intl.DateTimeFormat(LOCALE, { hour: 'numeric', timeZone: 'UTC' });
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'long', timeZone: 'UTC' });
const listFormat = new Intl.ListFormat(LOCALE, { type: 'conjunction' });

// "14:00" → "2 p. m.", "14:30" → "2:30 p. m.": minutes only when they aren't zero.
function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const format = minutes === 0 ? hourFormat : timeFormat;
  return format.format(new Date(Date.UTC(2000, 0, 1, hours, minutes)));
}

// 2024-01-01 was a Monday, so WEEK index i is 2024-01-(1 + i).
function dayName(day: DayOfWeek): string {
  return weekdayFormat.format(new Date(Date.UTC(2024, 0, 1 + WEEK.indexOf(day))));
}

function formatDays(days: DayOfWeek[]): string {
  const sorted = [...days].sort((a, b) => WEEK.indexOf(a) - WEEK.indexOf(b));
  const text = listFormat.format(sorted.map(dayName));
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function firstDay(entry: OpeningHours): number {
  return Math.min(...entry.days.map((day) => WEEK.indexOf(day)));
}

export function formatOpeningHours(openingHours: OpeningHours[]): OpeningHoursRow[] {
  if (openingHours.length === 0) return [];

  const open = [...openingHours]
    .sort((a, b) => firstDay(a) - firstDay(b))
    .map((entry) => ({
      days: formatDays(entry.days),
      hours: `${formatTime(entry.opens)} – ${formatTime(entry.closes)}`,
    }));
  const closed = WEEK.filter((day) => !openingHours.some((entry) => entry.days.includes(day)));

  return closed.length > 0 ? [...open, { days: formatDays(closed), hours: 'Cerrado' }] : open;
}
