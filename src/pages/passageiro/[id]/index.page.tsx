import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Backdrop, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { HeaderMenu, MySnackBar, NotificationModal } from "@/components";
import { usePassanger } from "./passanger.controller";

import { getUserById } from "@/services/requests/user.request";
import { IUser } from "@/dataTypes/passanger.dto";

import { ActiveDisplacement } from "./ActiveDisplacement";
import { userMenuLinks } from "@/constants/userMenuLinks";
import { StartDisplacementModal } from "./StartDisplacementModal";

export default function PassangerPage({ user } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    askACar,
    isStartModalOpen,
    handleStartModal,
    isSuccessStart,
    isLoading,
    handleStartDisplacement,
    activeDisplacement,
    handleFinishDisplacement,
    closeNotificationModal,
    isModalOpen,
    modalInfos,
    isSnackbarOpen,
    snackbarInfos,
    handleMySnackBar,
  } = usePassanger(user?.id)

  const hasActiveDisplacement = Boolean(activeDisplacement)

  return (
    <>
      <HeaderMenu
        pages={userMenuLinks(user?.id!)}
      />
      <Container maxWidth='sm'>

        {!hasActiveDisplacement && (
          <>
            <Grid container marginTop={16}>
              <Grid item padding={2}>
                <Typography component='h1' variant="h4" sx={{ textTransform: 'capitalize' }}>
                  Olá {user?.nome},
                </Typography>
                <Typography variant="body1" mt={2} color='gray'>
                  Para onde deseja ir hoje? Você já sabe, é só pedir um carro e nossos motoristas irão até você para te levamos pra onde deseja ir.
                </Typography>
              </Grid>
            </Grid>

            <Grid container marginTop={4} sx={{ placeContent: 'center' }}>
              <Button variant="contained"
                sx={{ width: 300, height: 64 }}
                onClick={askACar}
              >
                Pedir um carro
              </Button>

              <StartDisplacementModal
                handleModal={handleStartModal}
                action={handleStartDisplacement}
                isModalOpen={isStartModalOpen}
                isSuccess={isSuccessStart}
              />
            </Grid>
          </>
        )}

        {hasActiveDisplacement && (
          <ActiveDisplacement
            handleFinishDisplacement={handleFinishDisplacement}
            data={activeDisplacement}
          />
        )}


        <NotificationModal
          isModalOpen={isModalOpen}
          closeNotificationModal={closeNotificationModal}
          modalInfos={modalInfos}
        />
        <MySnackBar
          isOpen={isSnackbarOpen}
          handleClose={handleMySnackBar}
          snackbarInfos={snackbarInfos}
        />
        <Backdrop
          sx={{ color: '#fff', zIndex: 10 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  user: IUser | null;
}> = async ({ req, res, params }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20, stale-while-revalidate=59"
  );

  const userId = String(params?.id);

  try {
    const { user } = await getUserById(userId);

    return {
      props: {
        user: user
      },
    };
  } catch (err) {
    return {
      props: {
        user: null
      },
    };
  }
};
