export const isTodayConfirmation = (dateStr: string | null): boolean => {
  if (!dateStr) return false;
  const today = new Date();
  const d = /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
    ? new Date(`${dateStr}T00:00:00`)
    : new Date(dateStr);
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
};
