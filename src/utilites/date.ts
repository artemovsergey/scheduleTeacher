export function DayWeekNameShort(n: number) {
  const days = ["", "Пн", "Вт", "Ср", "Чт", "Пт"];
  return days[n] || "";
}

export function getWeekDateRange(weekNumber: number) {
  const baseDate = new Date(2026, 0, 12);
  const startDate = new Date(baseDate);
  startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 4);

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  };

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export function getDateDay(weekNumber: number, weekDay: number) {
  const baseDate = new Date(2026, 0, 12);
  const startDate = new Date(baseDate);
  startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7 + (weekDay - 1));

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  };

  return formatDate(startDate);
}


export const sortByDates = (dates: string[]) =>
  [...dates].sort((a, b) => {
    const [dayA, monthA] = a.split('.').map(Number);
    const [dayB, monthB] = b.split('.').map(Number);
    const dateA = new Date(2026, monthA - 1, dayA);
    const dateB = new Date(2026, monthB - 1, dayB);
    return dateA.getTime() - dateB.getTime();
  });

export const getDayOfWeek = (dateStr: string): string => {
  const [day, month] = dateStr.split('.').map(Number);
  const date = new Date(2026, month - 1, day);
  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  return days[date.getDay()] || "";
};