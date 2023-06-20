import { newDateOnBr } from "@/lib/dayjs";
import dayjs from "dayjs";
import React from "react";

export function useTimer(startDate: string | undefined) {
  const [secondsPassed, setSecondsPassed] = React.useState(0);

  const startTime = dayjs(dayjs(startDate).toISOString()).unix();
  const endTime = dayjs(new Date()).unix();

  const minutesAmount = Math.floor(secondsPassed / 60);
  const secondsAmount = secondsPassed % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  React.useEffect(() => {
    let interval: any;
    const activeCycle = true;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = endTime - startTime;
        setSecondsPassed(secondsDifference);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [endTime, startTime, secondsPassed]);
  return { minutes, seconds };
}
