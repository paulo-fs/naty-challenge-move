import { Typography } from "@mui/material";
import { useTimer } from "./Timer.controller";

interface TimerProps {
  startDate: string | undefined;
}

export function Timer({startDate}: TimerProps) {
  const {minutes, seconds} = useTimer(startDate)

  return (
    <Typography component='span' variant="h5">{minutes}:{seconds}</Typography>
  )
}
