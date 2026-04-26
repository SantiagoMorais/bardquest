/**
 * Returns how many full days have passed since the given date.
 */
export const daysSince = (dateStr: string | null | undefined): number | null => {
  if (!dateStr) return null;

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;

  const today = new Date();
  const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

  return Math.floor((utcToday - utcDate) / (1000 * 60 * 60 * 24));
};
