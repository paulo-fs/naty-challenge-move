import * as dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export function newDateOnBr() {
  const newDate = new Date();
  const currentTz = dayjs.tz.guess();

  const date = dayjs.tz(newDate, currentTz).subtract(3, "h").toISOString();
  return date;
}
