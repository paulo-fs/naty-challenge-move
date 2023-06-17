import { useState } from "react";
import { CustomSelect, HeaderMenu } from "@/components";
import { Box, Button, Card, CardActions, CardContent, Container, Grid, Typography, SvgIcon } from "@mui/material";
import iconCar from '@/assets/icons/car.svg'
import Image from "next/image";

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const cars = [
  'Corsa',
  'Gol',
  'Fiesta',
  'Palio'
]

export default function PassangerPage() {
  const [driverName, setDriverName] = useState<string[]>([])
  const [selectedCar, setSelectedCar] = useState<string[]>([])
  const isDisabled = driverName.length ===0 || selectedCar.length === 0

  return (
    <>
      <HeaderMenu />
      <Container maxWidth='xl'>
        <Grid container display='flex' marginTop={20} >
          <Grid item sm={6} padding={2}>
            <Typography component='h1' variant="h4">
              Olá fulano,
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
                  valuesList={names}
                  selectedValue={driverName}
                  setValueFunc={setDriverName}
                />
              </CardContent>
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <CustomSelect
                  label="Selecione o carro"
                  placeholderValue="Selecione o carro"
                  valuesList={cars}
                  selectedValue={selectedCar}
                  setValueFunc={setSelectedCar}
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
                  {selectedCar}
                </Typography>
              </CardContent>

              <CardActions>
                <Button variant="contained" disableElevation disabled={isDisabled}>
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
