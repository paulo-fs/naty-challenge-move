import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Button, Card, CardActions, CardContent, CircularProgress, Container, FormControl, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { HeaderMenu, NotificationModal } from "@/components";

import { DriverForm } from "@/pages/register/DriverForm/DriverForm";
import { getAllDisplacements } from "@/services/requests/displacement.request";
import { useUserProfilePage } from "./UserProfilePage.controller";
import { userMenuLinks } from "@/constants/userMenuLinks";
import { getUserById } from "@/services/requests/user.request";
import { IUser } from "@/dataTypes/passanger.dto";
import { UserForm } from "@/pages/register/UserForm/Userform";

export default function Driver({ user, dashboard } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    updateUserInfos,
    deleteThisUser,
    isDisabled,
    handleAbleDisableForm,
    openDeleteMenu,
    anchorEl,
    handleOpenDeleteMenu,
    handleCloseDeleteMenu,
    closeNotificationModal,
    isModalOpen,
    modalInfos,
  } = useUserProfilePage(user)

  return (
    <>
      <HeaderMenu pages={userMenuLinks(user?.id!)} />
      <Container maxWidth='xl' sx={{ mb: 10, overflowX: 'hidden' }}>
        {/* description */}
        <Grid container marginTop={14}>
          <Grid item sm={6} padding={2}>
            <Typography component='h1' variant="h4" sx={{ textTransform: 'capitalize' }}>
              Olá {user?.nome},
            </Typography>
            <Typography variant="body1">
              Este é o seu perfil como cliente da Move. Você pode editar ou excluir seu perfil, caso desejar.
            </Typography>
          </Grid>
        </Grid>

        {/* content */}
        <Grid container marginTop={4} rowSpacing={2}>
          {/* driver infos */}
          <Grid item xs={12} md={8} paddingX={2}>
            <Card variant="outlined">
              <FormControl component='form' onSubmit={handleSubmit(updateUserInfos)}>
                <CardContent>
                  <Grid container>
                    <UserForm
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
                          <MenuItem onClick={deleteThisUser} disabled={isSubmitting}>
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
                        <Button variant="contained" onClick={handleSubmit(updateUserInfos)} disabled={isSubmitting} fullWidth>
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
          <Grid item xs={12}md={4} paddingX={2}  sx={{ textAlign: 'center' }}>
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
  user: IUser | null;
  dashboard: {
    total: number;
    finished: number;
    unfinished: number;
  }
}> = async ({ req, res, params }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=30"
  );

  const userId = String(params?.id);

  try {
    const { user } = await getUserById(userId);
    const { displacements } = await getAllDisplacements()

    const total = displacements.filter(item => String(item.idCliente) === userId)
    const finished = total.filter(item => item.kmFinal)
    const unfinished = total.filter(item => !item.kmFinal)

    const driverDisplacements = {
      total: total.length,
      finished: finished.length,
      unfinished: unfinished.length
    }

    return {
      props: {
        user,
        dashboard: driverDisplacements
      },
    };
  } catch (err) {
    return {
      props: {
        user: null,
        dashboard: {
          total: 0,
          finished: 0,
          unfinished: 0
        }
      },
    };
  }
};
