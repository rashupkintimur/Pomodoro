export function getTimeFromMins(mins: number) {
  const hours: number = Math.trunc(mins / 60);
  const minutes: number = mins % 60;

  if (hours === 0) return minutes + " мин";

  return `${hours} час ${minutes} мин`;
}

export function getTimeFromSecs(seconds: number) {
  return `${seconds} сек`;
}
