import { Alert, AlertColor, Snackbar } from "@mui/material";
import { IMySnackbarInfos, useMySnackBar } from "./MySnackBar.controller";

interface MySnackbarProps {
  isOpen: boolean
  snackbarInfos: IMySnackbarInfos
  handleClose: () => void
}

export function MySnackBar({
  isOpen, snackbarInfos, handleClose
}: MySnackbarProps) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={isOpen}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert severity={snackbarInfos.type}>
        {snackbarInfos.message}
      </Alert>
    </Snackbar>
  )
}
