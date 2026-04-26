/**
 * Returns how many calendar days have passed since the given local date.
 */
export const daysSince = (dateStr: string | null | undefined): number | null => {
  if (!dateStr) return null;

  const [year, month, day] = dateStr.split("-").map(Number);

  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);
  const today = new Date();

  const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return Math.floor((todayStart.getTime() - dateStart.getTime()) / (1000 * 60 * 60 * 24));
};
