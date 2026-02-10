export const getCurrentWeek = () => {
    const today = new Date();
    const baseDate = new Date(2026, 0, 12);
    const diffTime = today.getTime() - baseDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const week = Math.min(Math.max(1, Math.floor(diffDays / 7) + 1), 22);
    // const day = (today.getDay() === 0 ? 7 : today.getDay());
    // const normalizedDay = day > 5 ? 1 : day;
    return week
}