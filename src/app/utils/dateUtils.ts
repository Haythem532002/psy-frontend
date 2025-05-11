export function getFirstAndLastDayOfWeek(): [Date, Date] {
  const today = new Date();
  const currentDay = today.getDay();
  const firstDayOfWeek = new Date(today);
  const lastDayOfWeek = new Date(today);
  const diff = today.getDate() - currentDay + (currentDay == 0 ? -6 : 1);

  firstDayOfWeek.setDate(diff);
  lastDayOfWeek.setDate(diff + 4);

  return [firstDayOfWeek, lastDayOfWeek];
}

export function SplitDateTime(dateTime: string): string[] {
  return dateTime.split('T');
}
