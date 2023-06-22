import Image from "next/image";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Button, Card, CardActions, CardContent, CircularProgress, Container, FormControl, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { HeaderMenu, NotificationModal } from "@/components";

import { getDriverById } from "@/services/requests/driver.request";
import { IDriver } from "@/dataTypes/driver.dto";

import iconCar from '@/assets/icons/car.svg'
import { DriverForm } from "@/pages/register/DriverForm/DriverForm";
import { useDriverPage } from "./DriverPage.controller";

export default function Driver({ driver } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
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
      <HeaderMenu />
      <Container maxWidth='xl'>
        <Grid container marginTop={14} >
          <Grid item sm={6} padding={2}>
            <Typography component='h1' variant="h4" sx={{ textTransform: 'capitalize' }}>
              Olá {driver?.nome},
            </Typography>
            <Typography variant="body1">
              Este é o seu perfil como condutor da Move. Você pode editar ou excluir seu perfil, caso desejar.
            </Typography>
          </Grid>
            <Grid item sm={6} paddingX={2}>
              <Image src={iconCar} alt='' style={{ opacity: 0.3 }} width={120} />
            </Grid>
        </Grid>

        <Grid container marginTop={4}>
          <Grid item sm={6} paddingX={2}>
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

          <Grid item sm={6} paddingX={2}>
            <Card elevation={0} sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

              </CardContent>
            </Card>
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
}> = async ({ req, res, params }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=49"
  );

  const driverId = String(params?.id);

  try {
    console.log('entrou')
    const { driver } = await getDriverById(driverId);
    console.log(driver)

    return {
      props: {
        driver
      },
    };
  } catch (err) {
    return {
      props: {
        driver: null,
      },
    };
  }
};
