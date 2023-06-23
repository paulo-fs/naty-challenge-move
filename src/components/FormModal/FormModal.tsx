import React from "react";
import Link from "next/link";
import { Box, Button, Card, CardActions, CardContent, CircularProgress, FormControl, Grid, Modal, Paper, Typography } from "@mui/material";

interface FormModalProps {
  children: React.ReactNode
  isOpen: boolean,
  handleModal: () => void
  handleSubmit: any,
  submitFunc: (data: any) => Promise<void>,
  isSubmitting?: boolean
}

export function FormModal(props: FormModalProps) {
  const { children, handleSubmit, submitFunc, isSubmitting, isOpen, handleModal} = props

  return (
    <Modal
      open={isOpen}
      onClose={handleModal}
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

          <Typography variant="h4" color='primary'>Editar</Typography>

          <FormControl component='form' onSubmit={handleSubmit(submitFunc)}>
            <Card variant="outlined" elevation={0} sx={{ width: '100%' }}>
              <CardContent>
                <Grid container>
                  {children}
                </Grid>
              </CardContent>
              <CardActions sx={{
                paddingX: 3, paddingBottom: 3, display: 'flex', flexDirection: 'column', gap: 2
              }}>
                <Button variant="contained" type="submit" fullWidth disabled={isSubmitting}>
                  {isSubmitting
                    ? <CircularProgress size={24} />
                    : 'Editar'
                  }
                </Button>
                <Button variant="text" fullWidth onClick={handleModal}>Cancelar</Button>
              </CardActions>
            </Card>
          </FormControl>
        </Paper>
      </Box>
    </Modal>
  )
}
