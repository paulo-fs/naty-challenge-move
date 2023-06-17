import { Box, Button, Modal, Paper, Typography } from "@mui/material";

interface NotificationModalProps {
  isModalOpen: boolean
  handleModalClose: () => void
  modalTitle: string
  modalDescription: string
  error?: boolean
}

export function NotificationModal({
  isModalOpen, handleModalClose, modalTitle, modalDescription, error = false
}: NotificationModalProps) {
  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
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
          <Typography variant="h5" fontWeight={700} color={error ? 'error' : 'primary'}>
            {modalTitle}
          </Typography>
          <Typography marginBottom={4}>
            {modalDescription}
          </Typography>
          <Button variant="contained" onClick={handleModalClose}>Fechar</Button>
        </Paper>
      </Box>
    </Modal>
  )
}
