import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import { INotificationModalInfos } from "./NotificationModal.controller";

interface NotificationModalProps {
  isModalOpen: boolean
  closeNotificationModal: () => void
  modalInfos: INotificationModalInfos
}

export function NotificationModal({
  isModalOpen, closeNotificationModal, modalInfos
}: NotificationModalProps) {
  return (
    <Modal
      open={isModalOpen}
      onClose={closeNotificationModal}
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
          <Typography variant="h5" fontWeight={700} color={modalInfos.error ? 'error' : 'primary'}>
            {modalInfos.title}
          </Typography>
          <Typography marginBottom={4}>
            {modalInfos.message}
          </Typography>
          <Button variant="contained" onClick={closeNotificationModal}>Fechar</Button>
        </Paper>
      </Box>
    </Modal>
  )
}
