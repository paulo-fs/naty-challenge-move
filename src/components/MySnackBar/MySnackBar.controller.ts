import { AlertColor } from "@mui/material";
import React from "react";

export interface IMySnackbarInfos {
  type: AlertColor | undefined;
  message: string;
}

export function useMySnackBar() {
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
  const [snackbarInfos, setSnackbarInfos] = React.useState<IMySnackbarInfos>({
    type: undefined,
    message: "",
  });

  function handleMySnackBar() {
    setIsSnackbarOpen(!isSnackbarOpen);
  }

  function defineMySnackbarInfos(data: IMySnackbarInfos) {
    setIsSnackbarOpen(true);
    setSnackbarInfos({
      type: data.type,
      message: data.message,
    });
  }

  return {
    isSnackbarOpen,
    snackbarInfos,
    handleMySnackBar,
    defineMySnackbarInfos,
  };
}
