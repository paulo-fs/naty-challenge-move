import { Box, Button, Card, CardActions, CardContent, CircularProgress, Grid, Modal, Paper, Typography } from "@mui/material";
import { IConfirmModalState } from "./ConfirmModal.controller";

interface ConfirmModalProps {
  confirmModalState: IConfirmModalState
  handleCloseConfirmModal: () => void
  action: (data: any) => Promise<void>
}

export function ConfirmModal(props: ConfirmModalProps) {
  const { confirmModalState, handleCloseConfirmModal, action } = props

  return (
    <Modal
      open={confirmModalState.isOpen}
      onClose={handleCloseConfirmModal}
    >
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'grid',
        placeContent: 'center',
      }}>
        <Paper sx={{
          padding: 4,
          width: 350,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>

          <Card variant="elevation" elevation={0} sx={{ width: '100%' }}>
            <CardContent>
                <Typography variant="h4" color='red'>{confirmModalState.title}</Typography>
                <Typography mt={2} variant="h6">{confirmModalState.message}</Typography>
            </CardContent>
            <CardActions sx={{
              paddingX: 3, paddingY: 3, display: 'flex', gap: 2, mt: 2
            }}>
              <Button variant="text" fullWidth onClick={handleCloseConfirmModal}>
                Cancelar
              </Button>
              <Button variant="contained" fullWidth onClick={action}>
                Excluir
              </Button>
            </CardActions>
          </Card>

        </Paper>
      </Box>
    </Modal>
  )
}
