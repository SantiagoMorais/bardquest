const toUtcDateKey = (value: string): string | null => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return null;

  return parsedDate.toISOString().slice(0, 10);
};

export const isTodayConfirmation = (dateStr: string | null): boolean => {
  if (!dateStr) return false;

  const todayUtc = new Date().toISOString().slice(0, 10);
  const practiceDayUtc = toUtcDateKey(dateStr);

  if (!practiceDayUtc) return false;

  return practiceDayUtc === todayUtc;
};
