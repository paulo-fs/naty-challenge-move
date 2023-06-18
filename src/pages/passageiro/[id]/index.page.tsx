import Image from "next/image";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import { CustomSelect, HeaderMenu } from "@/components";
import { usePassanger } from "./passanger.controller";

import { getUserById } from "@/services/requests/user.request";
import { getDriversInputList } from "@/services/requests/driver.request";
import { IUser } from "@/dataTypes/passanger.dto";
import { IDriverSelectInputData } from "@/dataTypes/driver.dto";

import iconCar from '@/assets/icons/car.svg'
import { getVehicleInputData } from "@/services/requests/vehicle.request";
import { IVehicleSelectInputData } from "@/dataTypes/vehicle.dto";

export default function PassangerPage({ user, drivers, vehicles } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    driverName,
    setDriverName,
    setDriverId,
    carModel,
    setCarModel,
    setCarId,
    isDisabled,
  } = usePassanger()

  const router = useRouter()

  if (user === null) {
    router.replace('/')
  }

  return (
    <>
      <HeaderMenu />
      <Container maxWidth='xl'>
        <Grid container display='flex' marginTop={14} >
          <Grid item sm={6} padding={2}>
            <Typography component='h1' variant="h4" sx={{ textTransform: 'capitalize' }}>
              Olá {user?.nome},
            </Typography>
            <Typography variant="body1">
              Para onde deseja ir hoje? Escolha um dos motoristas e carros disponíveis e, quando chegar ao seu destino, basta sinalizar a finalização do trajeto.
            </Typography>
          </Grid>
            <Grid item sm={6} paddingX={2}>
              <Image src={iconCar} alt='' style={{ opacity: 0.3 }} width={120} />
            </Grid>
        </Grid>

        <Grid container marginTop={4}>
          <Grid item sm={6} paddingX={2}>
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <CustomSelect
                  label="Motorista"
                  placeholderValue="Selecione o motorista"
                  valuesList={drivers!}
                  selectedValue={driverName}
                  setValueFunc={setDriverName}
                  setId={setDriverId}
                />
              </CardContent>
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <CustomSelect
                  label="Selecione o carro"
                  placeholderValue="Selecione o carro"
                  valuesList={vehicles!}
                  selectedValue={carModel}
                  setValueFunc={setCarModel}
                  setId={setCarId}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={6} paddingX={2}>
            <Card elevation={0} sx={{ height: '100%' }}>
              <CardContent>
                <Typography>
                  Motorista selecionado:
                </Typography>
                <Typography color='primary' fontWeight={700} fontSize={20}>
                  {driverName ?? ''}
                </Typography>

                <Typography marginTop={4}>
                  Carro selecionado:
                </Typography>
                <Typography color='primary' fontWeight={700} fontSize={20}>
                  {carModel}
                </Typography>
              </CardContent>

              <CardActions>
                <Button variant="contained" disabled={isDisabled}>
                  Iniciar trajeto
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  user: IUser | null;
  drivers: IDriverSelectInputData[] | null;
  vehicles: IVehicleSelectInputData[] | null
}> = async ({ req, res, params }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20, stale-while-revalidate=59"
  );

  const userId = String(params?.id);

  try {
    const { user } = await getUserById(userId);
    const { drivers } = await getDriversInputList();
    const { vehicles } = await getVehicleInputData()

    return {
      props: {
        user: user,
        drivers: drivers,
        vehicles: vehicles
      },
    };
  } catch (err) {
    return {
      props: {
        user: null,
        drivers: null,
        vehicles: null
      },
    };
  }
};
