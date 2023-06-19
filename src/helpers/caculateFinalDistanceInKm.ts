import dayjs from "dayjs";

export function calculateFinalDistanceInKm(startDate: string) {
  const speed = 3000; // speend in m/min = 180km/h
  const startTime = dayjs(dayjs(startDate).toISOString()).unix();
  const endTime = dayjs(new Date()).unix();
  const totalTimeSpent = (endTime - startTime) / 60;
  const distance = (speed * totalTimeSpent) / 1000;

  return Math.floor(distance);
}
