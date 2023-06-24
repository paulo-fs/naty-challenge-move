import { Box, Button, Grid, Modal, Paper, Typography } from "@mui/material";

interface StartDisplacementModalProps {
  isModalOpen: boolean;
  isSuccess: boolean;
  handleModal: () => void
  action: () => Promise<void>
}

export function StartDisplacementModal(props: StartDisplacementModalProps) {
  const { handleModal, action, isModalOpen, isSuccess } = props

  const onSuccessMessage = {
    title: 'Seu carro chegou!',
    message: 'Após entrar no carro, informe ao motorista para onde deseja ir e clique em iniciar...',
    buttonText: 'Iniciar'
  }

  const onFailureMessage = {
    title: 'Ops...',
    message: 'Não temos carros ou motoristas disponíveis no momento, peça novamente em alguns minutos...',
    buttonText: 'Fechar'
  }

  const resultMessage = isSuccess ? onSuccessMessage : onFailureMessage

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModal}
    >
      <Grid container sx={{
        width: '100%',
        height: '100%',
        placeContent: 'center',
      }}>
        <Paper sx={{
          padding: 4,
          width: '100%',
          maxWidth: 350,
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          gap: 2
        }}>

          <Typography
            variant="h4"
            color={isSuccess ? 'primary' : 'gray'}
          >
            {resultMessage.title}
          </Typography>
          <Typography>{resultMessage.message}</Typography>

          <Box mt={4}>
            <Button
              fullWidth
              variant='contained'
              onClick={
                isSuccess ? action : handleModal
              }
            >
              {resultMessage.buttonText}
            </Button>

            {isSuccess && (
              <Button variant="text" fullWidth sx={{ mt: 2 }} onClick={handleModal}>
                Cancelar
              </Button>
            )}
          </Box>

        </Paper>
      </Grid>
    </Modal>
  )
}
