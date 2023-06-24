import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Button, Card, CardActions, CardContent, CircularProgress, Container, FormControl, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { HeaderMenu, NotificationModal } from "@/components";

import { getDriverById } from "@/services/requests/driver.request";
import { IDriver } from "@/dataTypes/driver.dto";

import { DriverForm } from "@/pages/register/DriverForm/DriverForm";
import { useDriverPage } from "./DriverPage.controller";
import { getAllDisplacements } from "@/services/requests/displacement.request";

export default function Driver({ driver, dashboard } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    menuLinks,
    control,
    handleSubmit,
    errors,
    isSubmitting,
    updateDriverInfos,
    deleteThisDriver,
    isDisabled,
    handleAbleDisableForm,
    openDeleteMenu,
    anchorEl,
    handleOpenDeleteMenu,
    handleCloseDeleteMenu,
    closeNotificationModal,
    isModalOpen,
    modalInfos,
  } = useDriverPage(driver)

  return (
    <>
      <HeaderMenu pages={menuLinks} />
      <Container maxWidth='xl'>
        {/* description */}
        <Grid container marginTop={14} >
          <Grid item sm={6} padding={2}>
            <Typography component='h1' variant="h4" sx={{ textTransform: 'capitalize' }}>
              Olá {driver?.nome},
            </Typography>
            <Typography variant="body1">
              Este é o seu perfil como condutor da Move. Você pode editar ou excluir seu perfil, caso desejar.
            </Typography>
          </Grid>
        </Grid>

        {/* content */}
        <Grid container marginTop={4} rowSpacing={2}>
          {/* driver infos */}
          <Grid item xs={12} sm={8} paddingX={2}>
            <Card variant="outlined">
              <FormControl component='form' onSubmit={handleSubmit(updateDriverInfos)}>
                <CardContent>
                  <Grid container>
                    <DriverForm
                      control={control}
                      errors={errors}
                      isDisabled={isDisabled}
                      keepDisabled
                    />
                  </Grid>
                </CardContent>
                <CardActions>
                  {isDisabled
                    ? (
                      <>
                        <Button
                          variant="contained"
                          type="submit"
                          onClick={() => handleAbleDisableForm()}
                          fullWidth
                        >
                          Editar perfil
                        </Button>
                        <Button variant="outlined"
                          id='delte-button'
                          aria-controls={openDeleteMenu ? 'delete-menu' : undefined}
                          aria-haspopup='true'
                          aria-expanded={openDeleteMenu ? 'true' : undefined}
                          onClick={handleOpenDeleteMenu}
                          fullWidth
                        >
                          Excluir perfil
                        </Button>
                        <Menu
                          id='delete-menu'
                          anchorEl={anchorEl}
                          open={openDeleteMenu}
                          onClose={handleCloseDeleteMenu}
                          MenuListProps={{ 'aria-labelledby': 'delete-button' }}
                        >
                          <MenuItem onClick={deleteThisDriver} disabled={isSubmitting}>
                            {isSubmitting
                              ? <CircularProgress size={24} />
                              : 'Confirmar exclusão'
                            }
                          </MenuItem>
                          <MenuItem onClick={handleCloseDeleteMenu} disabled={isSubmitting}>Cancelar</MenuItem>
                        </Menu>
                      </>
                    )
                    : (
                      <>
                        <Button variant="contained" onClick={handleSubmit(updateDriverInfos)} disabled={isSubmitting} fullWidth>
                          {isSubmitting
                            ? <CircularProgress size={24} />
                            : 'Salvar alterações'
                          }
                        </Button>
                        <Button variant="outlined" onClick={() => handleAbleDisableForm()} disabled={isSubmitting} fullWidth>
                          Cancelar
                        </Button>
                      </>
                    )
                  }
                </CardActions>
              </FormControl>
            </Card>
          </Grid>

          {/* dashboard */}
          <Grid item xs={12} sm={4} paddingX={2} sx={{ textAlign: 'center' }}>
            <Grid container direction='column' gap={1}>
              <Grid item>
                <Card variant="outlined">
                  <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2">Total Deslocamentos</Typography>
                    <Typography variant="h5" color='primary'>{dashboard.total}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card variant="outlined">
                  <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2">Total Concluídos</Typography>
                    <Typography variant="h5" color='primary'>{dashboard.finished}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card variant="outlined">
                  <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2">Total Não concluídos ou Cancelados</Typography>
                    <Typography variant="h5" color='primary'>{dashboard.unfinished}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <NotificationModal
          isModalOpen={isModalOpen}
          closeNotificationModal={closeNotificationModal}
          modalInfos={modalInfos}
        />
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  driver: IDriver | null;
  dashboard: {
    total: number;
    finished: number;
    unfinished: number;
  }
}> = async ({ req, res, params }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=49"
  );

  const driverId = String(params?.id);

  try {
    const { driver } = await getDriverById(driverId);
    const { displacements } = await getAllDisplacements()

    const total = displacements.filter(item => String(item.idCondutor) === driverId)
    const finished = total.filter(item => item.kmFinal)
    const unfinished = total.filter(item => !item.kmFinal)

    const driverDisplacements = {
      total: total.length,
      finished: finished.length,
      unfinished: unfinished.length
    }

    return {
      props: {
        driver,
        dashboard: driverDisplacements
      },
    };
  } catch (err) {
    return {
      props: {
        driver: null,
        dashboard: {
          total: 0,
          finished: 0,
          unfinished: 0
        }
      },
    };
  }
};
