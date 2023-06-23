import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { HeaderMenu, MyTable } from "@/components";

import Link from "next/link";
import { menuLinks } from "@/constants/adminPanelLinks";

export default function VehiclesPanel() {
  // const {
  //   menuLinks,
  //   tableHead,
  //   tableData,
  // } = useVeiclePanel(vehicles)

  return (
    <>
      <HeaderMenu
        pages={menuLinks}
      />
      <Container maxWidth='xl'>
        {/* head description */}
        <Grid container marginTop={14} >
          <Grid item sm={6} padding={2}>
            <Typography component='h1' variant="h4" sx={{ textTransform: 'capitalize' }}>
              Relatório de veículos
            </Typography>
            <Typography variant="body1">
              Dados dos veículos da plataforma Move.
            </Typography>
          </Grid>
        </Grid>

        {/* content */}
        <Grid container marginTop={4} paddingX={4}>
        <Grid item xs={8}>
            <TextField fullWidth placeholder="Busque por..." size="small" />
          </Grid>

          <Grid item xs={2} paddingX={2} marginBottom={4} direction='row'>
              <Button variant="outlined" fullWidth>
                Limpar busca
              </Button>
          </Grid>

          <Grid item xs={2}>
            <Link href='/adminpanel/vehicles/register'>
              <Button variant="contained" fullWidth>
                Cadastrar veículo
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
