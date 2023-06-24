import { Button, Card, CardActions, CardContent, Container, FormControl, Grid, TextField, Typography } from "@mui/material";
import { HeaderMenu, NotificationModal } from "@/components";

import Link from "next/link";
import { menuLinks } from "@/constants/adminPanelLinks";
import { VehicleForm } from "./VehicleForm/VehicleForm";
import { useRegister } from "./register.controller";

export default function VehiclesPanel() {
  const {
    handleSubmit,
    submitForm,
    isSubmitting,
    errors,
    control,
    isModalOpen,
    closeNotificationModal,
    modalInfos,
  } = useRegister()

  return (
    <>
      <HeaderMenu
        pages={menuLinks}
      />
      <Container maxWidth='xl' sx={{ mb: 4 }}>
        {/* head description */}
        <Grid container marginTop={14} maxWidth={500} width='100%' marginX='auto'>
          <Grid item  padding={2}>
            <Typography component='h1' variant="h4" sx={{ textTransform: 'capitalize' }}>
              Registrar novo veículo
            </Typography>
            <Typography variant="body1">
              Cadastro dos veículos da plataforma Move.
            </Typography>
          </Grid>
        </Grid>

        {/* content */}
        <Grid container marginTop={4} maxWidth={500} width='100%' marginX='auto'>
          <FormControl component='form' onSubmit={handleSubmit(submitForm)}>
            <Card variant="outlined" elevation={0} sx={{ width: '100%' }}>
              <CardContent>
                <Grid container>
                  <VehicleForm
                    control={control}
                    errors={errors}
                  />
                </Grid>
              </CardContent>
              <CardActions sx={{
                paddingX: 3, paddingBottom: 3, display: 'flex', flexDirection: 'column', gap: 2
              }}>
                <Button variant="contained" type="submit" fullWidth>Registrar</Button>
                <Link href='/adminpanel/vehicles'>
                  <Button variant="text" fullWidth>Cancelar</Button>
                </Link>
              </CardActions>
            </Card>
          </FormControl>
        </Grid>

        <NotificationModal
          closeNotificationModal={closeNotificationModal}
          isModalOpen={isModalOpen}
          modalInfos={modalInfos}
        />
      </Container>
    </>
  )
}
