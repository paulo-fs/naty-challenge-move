import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Card, CardContent, Container, Divider, Grid, Typography } from "@mui/material";
import { HeaderMenu } from "@/components";
import { useAdminPanel } from "./adminPanel.controller";
import { DashboardItemContainer } from "./components/dashboard/DashboardItemContainer";
import { DashboardItem } from "./components/dashboard/DashboardItem";

import { getAllDrivers } from "@/services/requests/driver.request";
import { getAllDisplacements } from "@/services/requests/displacement.request";
import { getAllUsers } from "@/services/requests/user.request";
import { getAllVehicles } from "@/services/requests/vehicle.request";

export default function AdminPanel({ dashboard } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    menuLinks
  } = useAdminPanel()

  return (
    <>
      <HeaderMenu
        pages={menuLinks}
      />
      <Container maxWidth='xl'>
        {/* head description */}
        <Grid container marginTop={14} >
          <Grid item padding={2}>
            <Typography component='h1' variant="h4" sx={{ textTransform: 'capitalize' }}>
              Painel administrativo
            </Typography>
            <Typography variant="body1">
              Acompanhe e gerencie o que acontece na plataforma.
            </Typography>
          </Grid>
        </Grid>

        {/* content */}
        <Grid container marginTop={4}>
          <Grid item xs={12} md={6} padding={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h4">Usuários</Typography>
                <Divider />
                <>
                  <DashboardItemContainer marginTop={4}>
                    <DashboardItem title="Total" value={dashboard.user.total} />
                  </DashboardItemContainer>
                </>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} padding={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h4">Motoristas</Typography>
                <Divider />
                <>
                  <DashboardItemContainer marginTop={4}>
                    <DashboardItem title="Total" value={dashboard.driver.total} />
                  </DashboardItemContainer>
                </>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}  padding={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h4">Veículos</Typography>
                <Divider />
                <>
                  <DashboardItemContainer marginTop={4}>
                    <DashboardItem title="Total" value={dashboard.vehicle.total} />
                  </DashboardItemContainer>
                </>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6}  padding={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h4">Deslocamentos</Typography>
                <Divider />
                <>
                  <DashboardItemContainer marginTop={4}>
                    <DashboardItem
                      title="Total"
                      value={dashboard.displacement.total}
                    />
                  </DashboardItemContainer>
                  <DashboardItemContainer>
                    <DashboardItem
                      title="Completos"
                      value={dashboard.displacement.totalComplete}
                    />
                  </DashboardItemContainer>
                  <DashboardItemContainer>
                    <DashboardItem
                      title="Cancelados"
                      value={dashboard.displacement.totalCancelled}
                    />
                  </DashboardItemContainer>
                </>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  dashboard: {
    driver: {
      total: number,
    },
    user: {
      total: number,
    },
    vehicle: {
      total: number,
    },
    displacement: {
      total: number,
      totalComplete: number,
      totalCancelled: number
    }
  }
}> = async ({ req, res }) => {
  const dashboard = {
    driver: {
      total: 0,
    },
    user: {
      total: 0,
    },
    vehicle: {
      total: 0,
    },
    displacement: {
      total: 0,
      totalComplete: 0,
      totalCancelled: 0
    }
  }

  try {
    const { users } = await getAllUsers()
    dashboard.user.total = users.length
  } catch (err) {
    dashboard.user.total = 0
  };

  try {
    const { drivers } = await getAllDrivers()
    dashboard.driver.total = drivers.length
  } catch (err){
    dashboard.driver.total = 0
  }

  try {
    const { displacements } = await getAllDisplacements()
    const completeDisplacements = displacements.filter(item => item.fimDeslocamento).length
    const cancelledDisplacements = displacements.filter(item => !item.fimDeslocamento).length
    dashboard.displacement.total = displacements.length
    dashboard.displacement.totalComplete = completeDisplacements
    dashboard.displacement.totalCancelled = cancelledDisplacements
  } catch (err){
    dashboard.displacement.total = 0
    dashboard.displacement.totalComplete = 0
    dashboard.displacement.totalCancelled = 0
  }

  try {
    const { vehicles } = await getAllVehicles()
    dashboard.vehicle.total = vehicles.length
  } catch (err){
    dashboard.vehicle.total = 0
  }

  return {
    props: {
      dashboard
    },
  }
};
